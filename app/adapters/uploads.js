import query from './query';

export default query.extend( {
    find: function(name,ids) {
        if( typeof ids !== 'string' ) {
            ids = ids.join(',');
        }
        return this.query( { ids: ids } );
    }
});