import Ember from 'ember';

export default Ember.Route.extend({
    audioPlayer: Ember.inject.service(),

    actions: {
            doLicensePopup: function() {
                Ember.$('#licenseInfoPopupTriggerLink').click();
            },                   
            togglePlay: function(upload) {
                this.get('audioPlayer').togglePlay(upload);
            }
        },
});
