import Ember from 'ember';

export default Ember.Object.extend({

    _tagsArray: [ ],

        
    _arrayFromTagStr: function(str) {
            return str.replace(/^\s+|\s+$/, '').replace(/[^_\w]/g, ' ').replace(/\s+/g,',').split(',');
        },
    
    setFromString: function(str) {
            this._tagsArray = this._arrayFromTagStr(str);
            return this;
        },
        
    setFromOther: function(other) {
            this._tagsArray = other._tagsArray.slice();
            return this;
        },
        
    addFromString: function(str) {
            if( str ) {
                this._arrayFromTagStr(str).forEach( function(str) { this.addTag(str); }, this );
            }
            return this;
        },
        
    combineStrings: function(tags1,tags2) {
            if( !tags1 ) {
                return tags2;
            }
            if( tags2 ) {
                this.setFromString(tags1);
                this.addFromString(tags2);
                return this.convertToString();
            }
            return tags1;
        },
        
    convertToString: function() {
            var tagArr = this._tagsArray;
            if( tagArr.length > 0 ) {
                return tagArr.join(',');
            }
        },    
        
    addTag: function(tag) {
            if( tag && typeof(tag) === 'string' ) {
                if( tag.indexOf(',') !== -1 ) {
                    this.addFromString(tag);
                } else {
                    if( tag.match(/[^a-zA-Z0-9_]/) === null && !this.hasTag(tag) ) {
                        this._tagsArray.push(tag);
                    }
                }
            }
            return this;
        },
        
    replaceTagFrom: function(withTag,from) {
            this._tagsArray = this._tagsArray.filter( function(tag) { return from.indexOf(tag) === -1; } );
            if( withTag ) {
                this.addTag(withTag);
            }
            return this;
        },
        
    replaceTagWithTag: function(replaceThis,withThis) {
            if( replaceThis && (replaceThis !== withThis) ) {
                this.removeTag(replaceThis);
            }
            this.addTag(withThis);
            return this;
        },
        
    removeTag: function(tag) {
            var index = this._tagsArray.indexOf(tag);
            if( index > -1 ) {
                this._tagsArray.splice(index,1);
            }
            return this;
        },    
        
    removeAll: function() {
            this._tagsArray = [ ];
            return this;
        },
        
    toggleTag: function(tag,flag) {
            if( flag ) {
                this.addTag(tag);
            } else {
                this.removeTag(tag);
            }
            return this;
        },
        
    hasTag: function(tag) {
            return this._tagsArray.indexOf(tag) !== -1;
        },
        
    whichTag: function(arr) {
            var match = this._tagsArray.filter( function(tag) { 
                return arr.indexOf(tag) !== -1; 
            } );
            if( match.length > 0 ) {
                return match[0];
            }
            // return undefined
        }
    
});
