import QueryRouter from './query';

export default QueryRouter.extend({
  queryParams: {  
    search: { refreshModel: true },
  },
});
