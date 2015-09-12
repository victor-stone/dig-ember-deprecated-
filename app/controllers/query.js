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
        
        _done: false,
        
        _selectedTagWatcher: function() {
            if( !this._done && this.get('categories') ) {
                this._done = true;
                this.selectTags( this.get('model.selectedTags') );
            }            
        }.observes('categories','model'),
        
        _tagWatcher: function() {
            var tags = TagUtils.create( { source: this.selectedTags.mapBy( 'name' ) } );
            this.set('queryOptions.extraTags', tags);
        }.observes( 'selectedTags.[]'),
        
        selectTags: function(tags) {
            if( tags ) { // these are passed in via url ./query/tagalicious
                TagUtils.create( { source: tags } ).forEach( this.tagFinder(), this );
            }
        },
        
        tagFinder: function() {
            function matcher(tagName) {
                return function(tag) {
                    return tag.name === tagName;
                };
            }
            return function(tagName) {
                    var categories = this.get('categories');
                    for( var cat in categories ) {
                        var tag = categories[cat].find( matcher(tagName) );
                        if( tag ) {
                            tag.set('isSelected');
                            this.get('selectedTags').pushObject(tag);
                            return;
                        }
                    }
                };
        }
        
        
});
