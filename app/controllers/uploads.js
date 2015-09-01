import Ember from 'ember';

export default Ember.Controller.extend({
    queryOptions: Ember.inject.service(),
    
    actions: {
        search: function(text) {
            var appc = this.container.lookup('controller:application');
            appc.set('searchCollector', text);
            this.set('queryOptions.searchText', text);
            this.transitionToRoute('dig');
        },
    },
});
