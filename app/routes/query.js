import PageableRoute from './pageable';

export default PageableRoute.extend({

    routeQueryOptions: {
        genre: '*',
        instrumentalOnly: false,
        digDeep: false,
    },
    
});
