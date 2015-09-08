import Ember from 'ember';

export default Ember.Mixin.create({
    audioPlayer: Ember.inject.service(),
    
    media: function() {
              return this.get('audioPlayer').media({
                                track:            this,
                                artistBinding:    'artist',
                                titleBinding:     'name',
                                idBinding:        'id',
                                urlBinding:       'streamUrl'
                            });
            }.property(),
            
    isPlaylingBinding: 'media.isPlaying',
});
