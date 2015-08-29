/* globals Ember */
import PageableController from './pageable';

export default PageableController.extend({

    queryParams: [ 'tags', 'sinced', 'lic', 'title', 'sinced' ],

    applyQueryOptions: function() {
        Ember.run.once(this,'onOptionsChanged');
    }.observes('queryOptions.queryParams'),
      
    onOptionsChanged: function() {        
        this.setProperties( this.get('queryOptions.queryParams') );
        this._super();
    },                  

});
