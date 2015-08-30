import Ember from 'ember';

export default Ember.Controller.extend({

    queryParams: [ 'limit', 'offset' ],
    queryOptions: Ember.inject.service('query-options'),
    offset: 0,
    
    init: function() {
        this._super.apply(this,arguments);
        this.get('queryOptions'); // observers don't hook up if you never do a get()
    },

    applyQueryOptions: function() {
        Ember.run.once(this,'onOptionsChanged');
    }.observes('queryOptions.queryParams'),
      
    onOptionsChanged: function() {
        this.set('offset',0);
    },                  

    showPrev: function() {
        return this.get('offset') > 0;        
    }.property('offset'),
        
    showNext: function() {
        return  this.get('offset') + this.get('queryOptions.limit') < this.get('model.total');
    }.property('offset','queryOptions.limit'),
    
    prevValue: function() {
        var val = this.get('offset') - this.get('queryOptions.limit');
        if(  val < 0 ) {
            val = 0;
        }
        return val;
    }.property('offset','queryOptions.limit'),
    
    nextValue: function() {
        return this.get('offset') + this.get('queryOptions.limit');
    }.property('offset', 'queryOptions.limit'),


});
