import PageableRoute from './pageable';

export default PageableRoute.extend({

  queryParams: {
  
    tags:   { refreshModel: true },
    sinced: { refreshModel: true },
    title:  { refreshModel: true },
    lic:    { refreshModel: true },
  },

});
