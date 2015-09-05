import Store from './store';
import TagUtils from '../lib/tags';

export default Store.extend({
  query: function(params) {
        var adapter = this.container.lookup('adapter:query');
        if( params.category ) {
            var q = {
                f: 'json',
                dataview: 'tags_with_cat',
                category: params.category
            };
            return adapter.query(q)
                .then( function(results) {
                    return TagUtils.create( { source: results.mapBy( 'tags_tag' ) } );
                });
        }
  },
});
