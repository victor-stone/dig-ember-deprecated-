import Ember from 'ember';

export default Ember.Route.extend({
    setupController: function(controller, model) {
        model.container = this.container;
        this._super.apply(this,arguments);
    },
});
