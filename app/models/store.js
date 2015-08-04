import Ember from 'ember';

export default Ember.Object.extend({
    find: function(name,id) {
       // console.log("VICTOR looking for adapter:" + name);
        var adapter = this.container.lookup('adapter:' + name );
        return adapter.find(name,id);
    },
    query: function(params) {
     //   console.log("VICTOR looking for adapter:query with:");
     //   console.log(params);
        var adapter = this.container.lookup('adapter:query');
        return adapter.query(params);
    }
});
