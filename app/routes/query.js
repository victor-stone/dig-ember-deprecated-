/* globals Ember */
import PageableRoute from './pageable';


export default PageableRoute.extend({

    onOptionsChanged: function() {
//        this.get('queryOptions').updateOptions();
        this.refresh();
    },

    afterModel: function() {
        var controller = this.controllerFor('query');
        controller.set('loading',false);        
    },
    
    actions: {
        loading: function() {
            var controller = this.controllerFor('query');
            controller.set('loading',true);
        }
    }
});
