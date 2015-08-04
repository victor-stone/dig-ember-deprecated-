import query from './query';

export default query.extend( {
    find: function(name,id) {
        return this.query({ u: id });
    }
});