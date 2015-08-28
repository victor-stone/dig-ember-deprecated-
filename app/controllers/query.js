/* globals Ember */
import PageableController from './pageable';

export default PageableController.extend({

    queryParams: [ 'tags', 'sinced', 'lic', 'title', 'sinced' ],
    queryOptions: Ember.inject.service('query-options'),

    applyQueryOptions: function(optionService) {
        var qparams = optionService.queryParams;
        var str = '';
        for( var k in qparams ) {
            var val = qparams[k];
            this.set(k,val);
            str += k + '=' + val + '&';
        }
        return str;
    },
                        
    /*
        observe() seems to be broken for pathed properties
        so we put a dummy variable into the .hbs file that
        sets up the following trigger chain:
        - queryParams change in the queryOptions service
        - that invalidates this property
        - this property invalidates the template through
           {{querySignature}}
        - when the template fetches that property it 
          causes this function to run
        - this function gets the queryParams from the service
          and sets those variables on 'this'
        - setting properties invalidates the model
        - that causes a fetch of the model (with new query
          parameters) from the route        
    */
    querySignature: function() {
            return this.applyQueryOptions(this.get('queryOptions'));
        }.property('queryOptions.queryParams'),

});
