import Ember from 'ember';

export default Ember.Controller.extend({
    queryOptions: Ember.inject.service(),
    poolItemForTrackbackPopup: { },
    
    actions: {
        doDownloadPopup: function() {
            Ember.$('#downloadPopup').modal('show');
        },
        doTrackbackPopup: function(poolItem) {
            this.set('poolItemForTrackbackPopup',poolItem);
            Ember.$('#trackbackPopupTriggerLink').click();
        },
        doTrackbackForm: function() {
            Ember.$('#trackbackFormTriggerLink').click();
        },
        doSharePopup: function() {
            Ember.$('#sharePopupTriggerLink').click();
        },
        doLicensePopup: function() {
            return true;
        },
        togglePlay: function() {
            return true;
        }
    },
});
