import Ember from 'ember';

export default Ember.Route.extend({

    actions: {
            doLicensePopup: function() {
                    Ember.$('#licenseInfoPopupTriggerLink').click();
            },
                   
            togglePlay: function(item) {
                if( item ) {
                    item.get('media').togglePlay();
                }
            },
        },
});
