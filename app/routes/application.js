import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    // pageable
    limit: { refreshModel: true },
    offset: { refreshModel: true },
    // query
    tags: { refreshModel: true },
    sinced: { refreshModel: true },
    search: { refreshModel: true },
    title: { refreshModel: true },
    // dig-search
    lic: { refreshModel: true },
  },
});
