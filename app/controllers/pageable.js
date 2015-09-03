import Ember from 'ember';

export default Ember.Controller.extend({

    queryParams: [ 'offset' ],
    queryOptions: Ember.inject.service('query-options'),
    offset: 0,
    
    /*
    init: function() {
        this._super.apply(this,arguments);
        this.get('queryOptions'); // observers don't hook up if you never do a get()
    },
    */

    applyQueryOptions: function() {
        Ember.debug('Options changed controller: ' + this.toString() );
        var m = ':' + this.target.currentRouteName + ':';
        if( this.toString().match(m) !== null ) {
            Ember.run.once(this,'onOptionsChanged');
        }
    }.observes('queryOptions.queryParams'),
      
    onOptionsChanged: function() {
        Ember.debug('Setting offset in ' + this.toString());
        this.set('offset',0);
    },                  

    showPrev: function() {
        return this.get('offset') > 0;        
    }.property('offset'),
        
    showNext: function() {
        return  this.get('offset') + this.get('queryOptions.limit') < this.get('model.total');
    }.property('offset', 'model.total' /*, 'queryOptions.limit' */ ),
    
    prevValue: function() {
        var val = this.get('offset') - this.get('queryOptions.limit');
        if(  val < 0 ) {
            val = 0;
        }
        return val;
    }.property('offset', 'model' /*,'queryOptions.limit' */),
    
    nextValue: function() {
        return this.get('offset') + this.get('queryOptions.limit');
    }.property('offset', 'model' /* ,'queryOptions.limit' */),

    uploadForDownloadPopup: { upload_name: '(no upload selected)' },
    
    actions: {
        doDownloadPopup: function(upload) {
            var store = this.container.lookup('store:uploads');
            var me = this;
            store.find('uploads',upload.upload_id)
                .then( function(details) {
                    me.set('uploadForDownloadPopup',details);
                    Ember.$('#downloadPopupTriggerLink').click();
                });
        },
    },
});
