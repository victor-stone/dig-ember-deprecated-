import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        closePopup: function() {
            Ember.$('#msg').fadeOut();
        }
    },
});
