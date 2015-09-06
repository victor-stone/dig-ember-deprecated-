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
            retModel = model;
            return store.find('user',params.user_id);
        }
        
        function returnProfile( model ) {
            retModel.profile = model;
            return retModel;
        }
        
        return this._super(params,transition)
                    .then( getProfile )
                    .then( returnProfile );
    },
});
