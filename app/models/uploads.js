/* globals Ember */
import Store from './store';
import models from './models';

export default Store.extend({
    find: function(name,id) {
        Ember.debug('UPLOADS Store: Looking for adapter: ' + name + ' (using :query)');
        var adapter = this.container.lookup('adapter:query');
        var uploadQ = {
            ids: id,
            f: 'json',
            dataview: 'default',
        };
        var remixesQ = {
            remixes: id,
            f: 'json',
            dataview: 'links_u'
        };
        var trackbacksQ = {
            trackbacksof: id,
            f: 'json',
            dataview: 'trackbacks'
        };
        var queries = {
            upload: adapter.queryOne(uploadQ),
            remixes: adapter.query(remixesQ),
            trackbacks: adapter.query(trackbacksQ)
        };
        
        var upload = null;
        var me = this;
        return Ember.RSVP.hash(queries)
            .then( function(record) {
                upload            = models(record.upload, 'detail');
                upload.remixes    = models(record.remixes, 'remix') || [ ];
                upload.trackbacks = models(record.trackbacks, 'trackback') || [ ];                
                return me.findUser(upload.artistLogin);
            }).then( function(user) {
                upload.profile = user;
                return upload;
            });
    },
    
    info: function(id) {
        var adapter = this.container.lookup('adapter:query');
        var uploadQ = {
            ids: id,
            f: 'json',
            dataview: 'default'
        };
        
        return adapter.queryOne(uploadQ).then( models('detail') );
    }
  
});
