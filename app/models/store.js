import Ember from 'ember';

export default Ember.Object.extend({
    find: function(name,id) {
        console.log('Looking for adapter: ' + name);
        var adapter = this.container.lookup('adapter:' + name );
        return adapter.find(name,id);
    },
    query: function(params) {
        var adapter = this.container.lookup('adapter:query');
        return adapter.query(params);
    }
});
