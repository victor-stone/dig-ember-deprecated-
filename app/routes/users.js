import PageableRoute from './pageable';

export default PageableRoute.extend({

    skipUserListing: true,
    
    translateDynamicParamsToQuery: function( params ) {
        return { u: params.user_id };
    },

});
