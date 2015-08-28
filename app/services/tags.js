import Ember from 'ember';

var _tagsArray = [ ];

export default Ember.Service.extend({
        
    _arrayFromTagStr: function(str) {
            return str.replace(/^\s+|\s+$/, '').replace(/[^_\w]/g, ' ').replace(/\s+/g,',').split(',');
        },
    
    setFromString: function(str) {
            _tagsArray = this._arrayFromTagStr(str);
        },
        
    addFromString: function(str) {
            if( str ) {
                var arr = this._arrayFromTagStr(str);
                arr.forEach( this.addTag, this );
            }
            return this;
        },
        
    convertToString: function() {
            var tagArr = _tagsArray;
            if( tagArr.length > 0 ) {
                return tagArr.join(',');
            }
        },    
        
    addTag: function(tag) {
            if( tag !== '-' && !this.hasTag(tag) ) {
                _tagsArray.push(tag);
            }
        },
        
    replaceTagFrom: function(withTag,from) {
            _tagsArray = _tagsArray.filter( function(tag) { return from.indexOf(tag) === -1; } );
            if( withTag ) {
                this.addTag(withTag);
            }
        },
        
    removeTag: function(tag) {
            var index = _tagsArray.indexOf(tag);
            if( index > -1 ) {
                _tagsArray.splice(index,1);
            }
        },    
        
    removeAll: function() {
            _tagsArray = [ ];
        },
        
    toggleTag: function(tag,flag) {
            if( flag ) {
                this.addTag(tag);
            } else {
                this.removeTag(tag);
            }
        },
        
    hasTag: function(tag) {
            return _tagsArray.indexOf(tag) !== -1;
        },
        
    whichTag: function(arr) {
            var match = _tagsArray.filter( function(tag) { 
                return arr.indexOf(tag) !== -1; 
            } );
            if( match.length > 0 ) {
                return match[0];
            }
            // return undefined
        }
    
});
