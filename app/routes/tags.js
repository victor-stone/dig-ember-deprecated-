import Ember from 'ember';

export default Ember.Route.extend({

  model: function(params) {  
    params.limit = 10;
    return this.store.query(params);
  }
});
