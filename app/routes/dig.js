import PageableRoute from './pageable';
import models from '../models/models';

function match(text) {
    var rgx = new RegExp( text ,'i');
    return function(u) {
        return u.user_real_name.match(rgx) || u.user_name.match(rgx);
    };
}

export default PageableRoute.extend({

    routeQueryOptions: {
        matchAnyTags: false,
    },
    
    routeQueryParams: function() {
            return { 
                     s: this.get('queryOptions.searchText'),
                     search_type: 'all'
                    };
        }.property('queryOptions.searchText'),

    model: function(params,transition) {
        var retModel = { artists: [ ] };
        
        var text = this.get('queryOptions.searchText');
        if( text ) {
            var args = {
                    t: 'search_users',
                    limit: 40,
                    minrx: 1,
                    f: 'json',
                    search: text
                };

            var store = this.store;
            return this._model(params,transition).then( function(result) {
                retModel = result;
                return store.query(args);
            }).then( function(users) {
                retModel.artists = models( users.filter(match(text)), 'userBasic'  );
                return retModel;
            });
        }
        return this._model(params,transition);
    }
});
