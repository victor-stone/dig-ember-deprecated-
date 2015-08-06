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
  player: Ember.inject.service(),

  isPlaying:  false,
  artist:     '',
  album:      '',
  title:      '',
  site:       null,
  release:    null,
  imageUrl:   '',
  mp3Url:     '',

  playlist: function(key, value) {
    if (arguments.length > 1) {return value;}
    return [this];
  }.property(),

  sound: function() {
    var item = this;
    var streamUrl = this.get('mp3Url');
    var player = this.get('player');
    if (streamUrl) {
      var sound = soundManager.createSound({
        id:  streamUrl,
        url: streamUrl,
        onplay: function() {
          Ember.run(function() {
            player.set('track', item);
            item.set('isPlaying', true);
            item.trigger('onPlay');
          });
        },
        onstop: function() {
          Ember.run(function() {
            item.set('isPlaying', false);
            item.trigger('onStop');
          });
        },
        onfinish: function() {
          Ember.run(function() {
            item.set('isPlaying', false);
            item.trigger('onFinish');
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
        item.setProperties({
          bytesLoaded: this.bytesLoaded,
          bytesTotal: this.bytesTotal,
          position: this.position,
          duration: this.duration
        });
      };
      return sound;
    }
  }.property('mp3Url'),

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
  track: null,
  blankValue: -1,
  shouldContinuousPlay: true,
  position: Ember.computed.defaultTo('blankValue').property('currentSound'),
  duration: Ember.computed.defaultTo('blankValue').property('currentSound'),
  bytesLoaded: Ember.computed.defaultTo('blankValue').property('currentSound'),
  bytesTotal: Ember.computed.defaultTo('blankValue').property('currentSound'),
  positionPercentage: computedPercentage('position', 'duration'),
  loadedPercentage: computedPercentage('bytesLoaded', 'bytesTotal'),

  tracks: function(key, value) {
    if (arguments.length > 1) {return value;}
    return [];
  }.property(),

  trackIndex: function() {
    return this.get('tracks').indexOf(this.get('track'));
  }.property('track', 'tracks.@each'),

  getTrackAt: function(index) {
    var tracks = this.get('tracks');
    var trackCount = this.get('tracks.length');
    if (!trackCount) {return;}
    index = index % trackCount;
    if (index < 0) {index = trackCount + index;}
    return tracks.objectAt(index);
  },

  nextTrack: function() {
    return this.getTrackAt(this.get('trackIndex') + 1);
  }.property('trackIndex', 'tracks.@each'),

  previousTrack: function() {
    return this.getTrackAt(this.get('trackIndex') - 1);
  }.property('trackIndex', 'tracks.@each'),

  play: function(track, playlist) {
    if (playlist) {this.set('tracks', playlist);}
    if (track) {track.togglePlay();}
    return track;
  },

  playNextTrack: function() {
    var next = this.get('nextTrack');
    this.play(next);
  },

  playPreviousTrack: function() {
    var previous = this.get('previousTrack');
    this.play(previous);
  },

  didFinishTrack: function() {
    if (this.get('shouldContinuousPlay')) {
      this.playNextTrack();
    }
  },

  trackWillChange: function() {
    var track = this.get('track');
    if (track) {
      track.off('onFinish', this, this.didFinishTrack);
      track.stop();
    }
  }.observesBefore('track'),

  trackDidChange: function() {
    var track = this.get('track');
    if (track) {
      track.on('onFinish', this, this.didFinishTrack);
    }
  }.observes('track').on('init'),

  _media: function() {return {};}.property(),
  media: function(args) {
    var media = this.get('_media');
    args.container = this.get('container');
    var result = Media.create(args);
    var url = Ember.get(result, 'mp3Url');
    if (media[url]) {return media[url];}
    media[url] = result;
    return result;
  }
});