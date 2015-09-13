import PageableRoute from './pageable';

export default PageableRoute.extend({

    routeQueryOptions: {
        instrumentalOnly: false,
        genre: '*',
        recent: false,
        licenseScheme: 'all'
    },
    
    translateDynamicParamsToQuery: function( params ) {
        return { u: params.user_id };
    },

    model: function(params,transition) {
        var retModel = { };
        var store = this.store;
        
        function getArtistDetail( model ) {
            retModel = model;
            return store.find('user',params.user_id);
        }
        
        function returnArtistDetail( model ) {
            retModel.artist = model;
            return retModel;
        }
        
        return this._super(params,transition)
                    .then( getArtistDetail )
                    .then( returnArtistDetail );
    },
});
