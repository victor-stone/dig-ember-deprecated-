/* globals Ember */
import TagUtils from '../lib/tags';
import PageableController from './pageable';

export default PageableController.extend({
        queryOptions: Ember.inject.service(),
        
        selectedTags: [ ],
        catNames: ['genre', 'instr', 'mood'],
        categories: null,
        
        setupCategories: function() {
            var tagStore = this.container.lookup('store:tags');
            var me = this;
            tagStore.query( { categories: this.catNames, details: true } )
                .then( tags => me.set('categories',tags) );
        }.on('init'),
        
        actions: {
            remove: function(tag) {
                tag.set('isSelected',false);
                this.selectedTags.removeObject(tag);
            },
            clear: function() {
                this.selectedTags.forEach( t => t.set('isSelected',false) );
                this.set('selectedTags',[ ]);
            }
        },
        
        _tagWatcher: function() {
            var tags = TagUtils.create( { source: this.selectedTags.mapBy( 'name' ) } );
            this.set('queryOptions.extraTags', tags);
        }.observes( 'selectedTags.[]'),
});
