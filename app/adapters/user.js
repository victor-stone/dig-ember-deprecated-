import query from './query';

export default query.extend( {
    find: function(name,id) {
        console.log("WUPS did a user adapter");
        return this.query({ u: id });
    }
});