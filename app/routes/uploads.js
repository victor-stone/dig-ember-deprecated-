import Ember from 'ember';

export default Ember.Route.extend({
    audioPlayer: Ember.inject.service(),

    setupController: function(controller,model) {
        this.get('audioPlayer').bindToNowPlaying(model);
        this._super.apply(this,arguments);
    },

    beforeModel: function() {
        //Ember.debug('set loading ON');
        var controller = this.controllerFor('application');
        controller.set('loading',true);        
    },
    
    afterModel: function() {
        //Ember.debug('set loading OFF');
        var controller = this.controllerFor('application');
        controller.set('loading',false);        
    },
        
    model: function() {
        var me = this;
        return this._super.apply(this,arguments).catch(function(){
            me.transitionTo('unknown-upload');
        });
    }
});
