import Ember from 'ember';
/**
    Manipulate tags with ccHost policies in mind

    tag              := ascii alphanumeric and underscore
    tag string       := tags is separated by commas possibly with commas at the
                         start and end of string   
    tag parameter    := can be any one of: 
                            tag string
                            array
                            instance of TagUtils

    Class ensure unique (unordered) values.

    Examples:     
    
        var tags1 = TagUtils.create( { source: 'foo,bar' } );
        
        var tags2 = TagUtils.create( { source: [ 'fee', 'fie' ] } );
        
        var tags3 = TagUtils.create( { source: tags2 } );
        
        tags2.add(tags1);  // fee,fie,foo,bar
        tags2.toggle( ['fie','foo'], false ); // fee,bar
        tags3.remove('fee'); // fie
        
        var tags = TagUtils.combine(tags1, 'hip_hop,remix'); // 'foo,bar,hip_hop,remix'
*/
var TagUtils = Ember.Object.extend({

    _tagsArray: [ ],

    init: function() {
        this._super.apply(this,arguments);
        this.set('_tagsArray', TagUtils.toArray(this.get('source') || [ ] ));
    },

    add: function(tag) {
            function safeAddTag(tag) {
                if( tag && tag.match(/[^a-zA-Z0-9_]/) === null && !this.get('_tagsArray').contains(tag) ) {
                    this.get('_tagsArray').pushObject(tag);
                }
            }
            
            TagUtils.forEach( tag, safeAddTag, this );
            return this;
        },
        
    remove: function(tag) {
            var arr = this.get('_tagsArray');
            function safeRemove(tag) {
                if( arr.contains(tag) ) {
                    arr.removeObject(tag);
                }
            }
            TagUtils.forEach( tag, safeRemove, this);
            return this;
        },    
        
    replace: function(replaceThisSource,withThisSource) {
            if( replaceThisSource && (replaceThisSource !== withThisSource) ) {
                this.remove(replaceThisSource);
            }
            this.add(withThisSource);
            return this;
        },
        
    removeAll: function() {
            this.set('_tagsArray',[ ]);
            return this;
        },
        
    toggle: function(tag,flag) {
            if( flag ) {
                this.add(tag);
            } else {
                this.remove(tag);
            }
            return this;
        },
        
    contains: function(tag) {      
            return TagUtils.contains(this,tag);
        },
        
    tagString: function() {
            var tagArr = this.get('_tagsArray');
            if( tagArr.length > 0 ) {
                return tagArr.join(',');
            }
            return '';
        },

    forEach: function(callback,context) {
        TagUtils.toArray(this).forEach(callback,context);
        return this;
    },
        
});

TagUtils.reopenClass({

    combine: function(tags1,tags2) {
            if( !tags1 ) {
                return tags2;
            }
            if( tags2 ) {
                return TagUtils.create({ source: tags1 }).add(tags2).tagString();
            }
            return tags1;
        },

    contains: function(source,tag) {
        var srcArr = TagUtils.toArray(source);
        return TagUtils.toArray(tag).find( function(tag) {
                return srcArr.contains(tag);
            });
    },        
    
    toArray: function(source) {
            if( !source || source === '-' ) {
                return [ ];
            }
            var arr = null;
            if( typeof(source) === 'string' ) {
                arr = source.replace(/^[^_\w]+|[^_\w]+$/g, '') 
                            .replace(/[^_\w]/g, ' ') 
                            .replace(/\s+/g,',')
                            .split(',')
                            .reject( function(tag) {
                                return !tag;
                            });          
            } else if( Ember.isArray(source) ) {
                arr = source.slice();                
            } else if( source && source.hasOwnProperty('_tagsArray') ) {
                arr = source.get('_tagsArray').slice();                
            } else {
                arr = [ ];
            }
            return arr;
    },
    
    forEach: function(source,callback,context) {
        TagUtils.toArray(source).forEach(callback,context);
    }
});
export default TagUtils;