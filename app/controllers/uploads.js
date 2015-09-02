import Ember from 'ember';

export default Ember.Controller.extend({
    queryOptions: Ember.inject.service(),
    poolItemForTrackbackPopup: { },
    
    actions: {
        search: function(text) {
            var appc = this.container.lookup('controller:application');
            appc.set('searchCollector', text);
            this.set('queryOptions.searchText', text);
            this.transitionToRoute('dig');
        },
        doDownloadPopup: function() {
            Ember.$('#downloadPopupTriggerLink').click();
        },
        doTrackbackPopup: function(poolItem) {
            this.set('poolItemForTrackbackPopup',poolItem);
            Ember.$('#trackbackPopupTriggerLink').click();
        },
        doTrackbackForm: function() {
            Ember.$('#trackbackFormTriggerLink').click();
        },
    },
});
