import Ember from 'ember';

export default Ember.Route.extend({

  model: function(params,transition) {  
    var qparams = transition && transition.queryParams || params;
    return this.store.query(qparams);
  },
  
});
