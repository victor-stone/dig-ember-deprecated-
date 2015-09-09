import PageableRoute from './pageable';

export default PageableRoute.extend({

  queryParams: {  
    tags:   { refreshModel: true },
  },
});
