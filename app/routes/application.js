import Ember from 'ember';

export default Ember.Route.extend({
    audioPlayer: Ember.inject.service(),
    queryOptions: Ember.inject.service(),
    
    actions: {
        search: function(text) {
            var appc = this.container.lookup('controller:application');
            appc.set('searchCollector', text);
            this.set('queryOptions.searchText', text);
            this.transitionTo('dig');
        },
        doLicensePopup: function() {
            Ember.$('#licenseInfoPopup').modal('show');
        },                   
        togglePlay: function(upload) {
            this.get('audioPlayer').togglePlay(upload);
        },
        query: function() {
            this.transitionTo('query' );
        },
    },
});
