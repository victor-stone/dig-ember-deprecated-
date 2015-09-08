import Ember from 'ember';

export default Ember.Component.extend({
  audioPlayer: Ember.inject.service(),
  nowPlayingBinding: 'audioPlayer.nowPlaying',
  
  actions: {
    togglePause: function() {
        this.get('audioPlayer').togglePause();
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
