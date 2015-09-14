import PageableRoute from './pageable';


export default PageableRoute.extend({

    routeQueryOptions: {
        instrumentalOnly: true,
        matchAnyTags: true,
   },

    routeQueryParams: {
        tags: 'experimental, ambient, electronica'
    },
    
});
