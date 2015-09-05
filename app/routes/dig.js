/* globals Ember */
import PageableRoute from './pageable';

export default PageableRoute.extend({

    routeQueryOptions: {
    
        },

    routeQueryParams: function() {
            return { 
                     s: this.get('queryOptions.searchText'),
                     search_type: 'all'
                    };
        }.property('queryOptions.searchText'),

    _searchTextWatcher: function() {
        Ember.debug('dig search text watcher triggered curr: ' + this.router.currentRouteName);
        if( this.router.currentRouteName === this.routeName ) {        
            this.onOptionsChanged();
        }
    }.observes('queryOptions.searchText'),

});
