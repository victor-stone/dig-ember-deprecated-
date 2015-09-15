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
            Ember.$('#trackbackPopup').modal('show');
        },
        doTrackbackForm: function() {
            Ember.$('#trackbackForm').modal('show');
        },
        doSharePopup: function() {
            Ember.$('#sharePopup').modal('show');
        },
        doLicensePopup: function() {
            return true;
        },
        togglePlay: function() {
            return true;
        }
    },
});
