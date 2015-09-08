import Ember from 'ember';

export default Ember.Component.extend({
  audioPlayer: Ember.inject.service(),

  actions: {
    togglePlay: function() {
      var media = this.get('media');
      if (media) {
        this.get('audioPlayer').play(media, null); // this.get('playlist'));
      }
    },

    play: function() {
      this.get('audioPlayer').play(this.get('media')); //, this.get('playlist'));
      var media = this.get('media');
      if (media) {
        this.get('audioPlayer').play(media); //, this.get('playlist'));
      }
    },

    stop: function() {
      var media = this.get('media');
      if (media) {
        media.stop();
      }
    },

    playPrevious: function() {
      this.get('audioPlayer').playPrevious();
    },

    playNext: function() {
      this.get('audioPlayer').playNext();
    }
  }
});
