import Ember from 'ember';

export default Ember.Route.extend({

  queryParams: {
    tags: { refreshModel: true },
    sort: { refreshModel: true },
    ord: { refreshModel: true },
    sinced: { refreshModel: true },
    search: { refreshModel: true },
    limit: { refreshModel: true },
    offset: { refreshModel: true },
    title: { refreshModel: true },
  },

  model: function(params) {  
    params.limit = 10;
    return this.store.query(params);
  },
  
});
