import Ember from 'ember';

export default Ember.Controller.extend({

    queryParams: [ 'limit', 'offset' ],
    queryOptions: Ember.inject.service('query-options'),

    init: function() {
        this._super.apply(this,arguments);
        this.get('queryOptions'); // observers don't hook up if you never do a get()
    },

    applyQueryOptions: function() {
        Ember.run.once(this,'onOptionsChanged');
    }.observes('queryOptions.queryParams'),
      
    onOptionsChanged: function() {
        this.set('offset',undefined);
    },                  
    
    _safeLimit: function() {
            var limit = this.get('limit');
            if( !limit ) {
                limit = this.get('queryOptions.limit');
            }
            return Number(limit);
        },

    _safeOffset: function() {
            var offset = Number(this.get('offset'));
            if( isNaN(offset) ) {
                offset = 0;
            }
            return offset;
        },
    
    offsetValue: function() {
        return this.get('offset') > 0;
    }.property('offset'),
    
    nextOffset: function() {
        var limit = this._safeLimit();
        if (this.get('model.length') >= limit) {
            return limit + this._safeOffset();
        }
    }.property('offset', 'limit'),

    previousOffset: function() {
        var offset = this._safeOffset() - this._safeLimit();
        if (offset > 0) {
            return offset;
        }
    }.property('offset', 'limit')    

});
