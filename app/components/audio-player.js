import Ember from 'ember';

export default Ember.Component.extend({
  player: Ember.inject.service(),

  actions: {
    togglePlay: function() {
      var media = this.get('item.media');
      if (media) {
        this.get('player').play(media, this.get('playlist'));
      }
    },

    play: function() {
      this.get('player').play(this.get('item.media'), this.get('playlist'));
      var media = this.get('item.media');
      if (media) {
        this.get('player').play(media, this.get('playlist'));
      }
    },

    stop: function() {
      var media = this.get('item.media');
      if (media) {
        media.stop();
      }
    },

    playPrevious: function() {
      this.get('player').playPreviousTrack();
    },

    playNext: function() {
      this.get('player').playNextTrack();
    }
  }
});
