/* globals Ember */
import models from './models';

export default Ember.Object.extend({
    find: function(name,id) {
        Ember.debug('Looking for adapter: ' + name);
        if( name === 'user' ) {
            return this.findUser(id);
        }
        var adapter = this.container.lookup('adapter:' + name );
        return adapter.find(name,id);
    },
    findUser: function(id) {
        var qparams = {
            u: id,
            dataview: 'user_basic',
            f: 'json'
        };
        var adapter = this.container.lookup('adapter:query');
        return adapter.queryOne(qparams).then( models('user') );
    },
    query: function(params) {
        var adapter = this.container.lookup('adapter:query');
        return adapter.query(params);
    },
    count: function(qparams) {
        var countParams = { };
        Ember.merge(countParams,qparams);
        countParams.f = 'count';
        return this.query(countParams);
    },
    playlist: function(params) {
        return this.query(params).then( models('upload') );
    },
});
