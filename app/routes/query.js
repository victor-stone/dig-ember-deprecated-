import PageableRoute from './pageable';
import TagUtils from '../lib/tags';

export default PageableRoute.extend({

    translateDynamicParamsToQuery: function( params ) { 
        return { tags: TagUtils.create( { source: params.tags } ).toString() };
    },

    model: function(params,transition) {
        return this._model(params,transition).then( function(r) {
            r.selectedTags = params.tags;
            return r;
        });
    },
});
