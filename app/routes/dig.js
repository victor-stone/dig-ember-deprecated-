/* globals Ember */
import PageableRoute from './pageable';
import models from '../models/models';

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

    model: function(params,transition) {
        var retModel = { };

        var args = {
                t: 'search_users',
                limit: 40,
                minrx: 1,
                f: 'json',
                search: this.get('queryOptions.searchText')
            };

        var rgx = new RegExp( args.search ,'i');
        function match(u) {
            return u.user_real_name.match(rgx) || u.user_name.match(rgx);
        }

        var store = this.store;
        return this._model(params,transition).then( function(result) {
            retModel = result;
            return store.query(args);
        }).then( function(users) {
            retModel.artists = models( users.filter(match), 'userBasic'  );
            return retModel;
        });
    }
});
