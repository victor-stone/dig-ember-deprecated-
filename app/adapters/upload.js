import query from './query';

export default query.extend( {
    find: function(name,id) {
        return this.query( { ids: id } ).then( function(json) {
            return json[0];
        });
    }
});