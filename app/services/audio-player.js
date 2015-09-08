import Ember from 'ember';

import soundManager from 'soundManager';

function computedPercentage(partial, total) {
  return function() {
    var partialVal = this.get(partial),
        totalVal = this.get(total);
    if (totalVal) {
      return (partialVal / totalVal) * 100;
    }
    return 0;
  }.property(partial, total);
}

var Media = Ember.Object.extend(Ember.Evented, {
  audioPlayer: Ember.inject.service(),

  isPlaying:  false,
  artist:     '',
  album:      '',
  title:      '',
  site:       null,
  release:    null,
  imageUrl:   '',
  position: -1,
  duration: -1,
  bytesLoaded: -1,
  bytesTotal: -1,
    
  sound: function() {
    var streamUrl = this.get('url');
    if( !streamUrl ) {
        return;
    }
    var me = this;
    var playerService = this.get('audioPlayer');
    var sound = soundManager.createSound({
        id:  streamUrl,
        url: streamUrl,
        onplay: function() {
            Ember.run(function() {
                playerService.set('nowPlaying', me);
                me.set('isPlaying', true);
                me.trigger('onPlay');
            });
        },
        onstop: function() {
            Ember.run(function() {
                me.set('isPlaying', false);
                me.trigger('onStop');
            });
        },
        onfinish: function() {
            Ember.run(function() {
                me.set('isPlaying', false);
                me.trigger('onFinish');
            });
        },
        whileloading: function() {
                Ember.run.debounce(this.setPlaybackProperties.bind(this), 50);
            },
        whileplaying: function() {
                Ember.run.debounce(this.setPlaybackProperties.bind(this), 50);
            }
        });
        
    sound.setPlaybackProperties = function() {
        me.setProperties({
            bytesLoaded: this.bytesLoaded,
            bytesTotal: this.bytesTotal,
            position: this.position,
            duration: this.duration
            });
        };
        
    return sound;
    
  }.property('url'),

  stop: function() {
    var sound = this.get('sound');
    if (sound) {
      sound.stop();
    }
  },

  play: function() {
    var sound = this.get('sound');
    if (sound) {
      sound.play();
    }
  },

  setPosition: function(position) {
    return this.get('sound').setPosition(position);
  },

  setPositionPercentage: function(percentage) {
    var duration = this.get('duration');
    return this.setPosition(duration * (percentage / 100));
  },

  togglePlay: function() {
    if (this.get('isPlaying')) {
      this.stop();
    } else {
      this.play();
    }
  }
});

export default Ember.Service.extend({
  nowPlaying:   null,
  position:    Ember.computed.alias('nowPlaying.position'),
  duration:    Ember.computed.alias('nowPlaying.position'),
  bytesLoaded: Ember.computed.alias('nowPlaying.position'),
  bytesTotal:  Ember.computed.alias('nowPlaying.position'),
  
  positionPercentage: computedPercentage('position', 'duration'),
  loadedPercentage: computedPercentage('bytesLoaded', 'bytesTotal'),

  play: function(media, playlist) {
    if (media) {
        media.togglePlay();
    }
    return media;
  },

  playNext: function() {
  },

  playPrevious: function() {
  },

  didFinish: function() {
  },

  _mediaWatcher: function() {
    var media = this.get('nowPlaying');
    if( this._prevMedia && this._prevMedia !== media ) {
          this._prevMedia.off('onFinish', this, this.didFinish);
          this._prevMedia.stop();
    }
    if (media) {
      media.on('onFinish', this, this.didFinish);
      this._prevMedia = media;
    }
  }.observes('nowPlaying').on('init'),

  _mediaCache: function() {
    return {};
  }.property(),
  
  media: function(args) {
    var media;
    var url = args.track.get( args.urlBinding ) ;
    var cache = this.get('_mediaCache');
    [ 'artist', 'title', 'id', 'url'].forEach( k => args[k+'Binding'] = 'track.'+ args[k+'Binding'] );
    if (cache[url]) {
        media = cache[url];
        media.setProperties( args );
    } else {    
        args.container = this.get('container');
        media = Media.create(args);
        cache[url] = media;
    }
    return media;
  }
});