/* globals Ember */
import query from './query';

export default query.extend( {
    find: function(name,id) {
        Ember.debug('Using UPLOAD adapter');
        return this.query( { ids: id, f: 'json' } ).then( function(json) {
            return json[0];
        });
    }
});