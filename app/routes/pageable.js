import Ember from 'ember';

export default Ember.Route.extend({
    queryOptions: Ember.inject.service('query-options'),
    queryParams: {

        limit:  { refreshModel: true },
        offset: { refreshModel: true },

    },

    init: function() {
        this._super.apply(this,arguments);
        this.get('queryOptions'); // observers don't hook up if you never do a get()
    },

    _optionsWatcher: function() {
        Ember.run.once( this, 'onOptionsChange' );
    }.observes('queryOptions.queryParams'),
    
    onOptionsChange: function() {
        this.refresh();
    },
    
    mergeOptions: function(params) {
        var obj = { };
        Ember.merge(obj,params);
        var options = this.get('queryOptions.queryParams');
        for( var k in options ) {
            var val = options[k];
            if( typeof(val) !== 'undefined' ) {
                obj[k] = val;
            }
        }
        var qo = this.get('queryOptions');
        
        qo.set('instrumentalOnly', true );
        
        return obj;
    },
    
    model: function(params,transition) {  
        var qparams = this.mergeOptions(transition.queryParams);
        return this.store.query(qparams);
    },
});
