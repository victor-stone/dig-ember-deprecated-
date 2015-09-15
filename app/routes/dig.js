import PageableRoute from './pageable';
import models from '../models/models';

export default PageableRoute.extend({

    routeQueryOptions: {
        matchAnyTags: false,
    },
    
    routeQueryParams: function() {
            return { 
                     searchp: this.get('queryOptions.searchText'),
                     search_type: 'all',
                     dataview: 'links_by'
                    };
        }.property('queryOptions.searchText'),

    _watcher: function() {
        this.refresh();
    }.observes('queryOptions.searchText'),
    
    model: function(params,transition) {
        var retModel = { artists: [ ] };
        
        var text = this.get('queryOptions.searchText');
        if( text ) {
            var args = {
                    dataview: 'user_basic',
                    limit: 40,
                    minrx: 1,
                    f: 'json',
                    searchp: text
                };

            var store = this.store;
            return this._model(params,transition).then( function(result) {
                retModel = result;
                return store.query(args);
            }).then( function(users) {
                retModel.artists = models( users, 'userBasic'  );
                return retModel;
            });
        }
        return this._model(params,transition);
    },

});
