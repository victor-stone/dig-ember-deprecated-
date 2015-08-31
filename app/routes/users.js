/* globals Ember */

import PageableRoute from './pageable';

export default PageableRoute.extend({

    routeQueryOptions: {
        instrumentalOnly: false,
        genre: '-',
        recent: false,
        licenseScheme: 'all'
    },
    
    translateDynamicParamsToQuery: function( params ) {
        return { u: params.user_id };
    },

    model: function(params,transition) {
        var retModel = { };
        var store = this.store;
        
        function getProfile( model ) {
            Ember.merge(retModel,model);
            var qparams = {
                u: params.user_id,
                dataview: 'user_basic',
                f: 'json'
            };
            return store.query(qparams);
        }
        
        function returnProfile( model ) {
            retModel.profile = model[0];
            return retModel;
        }
        
        return this._super(params,transition)
                    .then( getProfile )
                    .then( returnProfile );
    },
});
