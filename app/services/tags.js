import Ember from 'ember';

export default Ember.Service.extend({
    _tagsArray: [ ],
    
    setFromString: function(str) {
            this._tagsArray = str.replace(/^\s+|\s+$/, '').replace(/\s+$/, ',').split(',');
        },
        
    convertToString: function() {
            var tagArr = this.get('_tagsArray');
            if( tagArr.length === 0 ) {
                return; // sic
            }
            tagArr = tagArr.filter( function(value, index, self) { 
                    return self.indexOf(value) === index;
                });
            return tagArr.join(',');
        },    
    addTag: function(tag) {
            if( tag !== '-' && !this.hasTag(tag) ) {
                this._tagsArray.push(tag);
            }
        },
    replaceTagFrom: function(withTag,from) {
            this._tagsArray = this._tagsArray.filter( function(tag) { return from.indexOf(tag) === -1; } );
            if( withTag ) {
                this.addTag(withTag);
            }
        },
    removeTag: function(tag) {
            var index = this._tagsArray.indexOf(tag);
            if( index > -1 ) {
                this._tagsArray.splice(index,1);
            }
        },    
    removeAll: function() {
            this._tagsArray = [ ];
        },
    toggleTag: function(tag,flag) {
            if( flag ) {
                this.addTag(tag);
            } else {
                this.removeTag(tag);
            }
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
