import Ember from 'ember';

export default Ember.Component.extend({
  audioPlayer: Ember.inject.service(),

  actions: {
    togglePlay: function() {
      var media = this.get('item.media');
      if (media) {
        this.get('audioPlayer').play(media, this.get('playlist'));
      }
    },

    play: function() {
      this.get('audioPlayer').play(this.get('item.media'), this.get('playlist'));
      var media = this.get('item.media');
      if (media) {
        this.get('audioPlayer').play(media, this.get('playlist'));
      }
    },

    stop: function() {
      var media = this.get('item.media');
      if (media) {
        media.stop();
      }
    },

    playPrevious: function() {
      this.get('audioPlayer').playPreviousTrack();
    },

    playNext: function() {
      this.get('audioPlayer').playNextTrack();
    }
  }
});
