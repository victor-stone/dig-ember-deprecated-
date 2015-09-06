import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
            doLicensePopup: function() {
                    Ember.$('#licenseInfoPopupTriggerLink').click();
            },
                   
            play: function() {
            }, 
        },
});
