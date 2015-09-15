/* globals Ember */
import Query from './query';
import models from './models';

export default Query.extend({
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
        var sourcesQ = {
            sources: id,
            f: 'json',
            dataview: 'links_u',
            datasource: 'uploads'
        };
        var queries = {
            upload: adapter.queryOne(uploadQ),
            remixes: adapter.query(remixesQ),
            trackbacks: adapter.query(trackbacksQ),
            sources: adapter.query(sourcesQ),
        };
        
        var upload = null;
        var me = this;
        return Ember.RSVP.hash(queries)
            .then( function(record) {
                upload            = models(record.upload, 'detail');
                upload.remixes    = models(record.remixes, 'remix') || [ ];
                upload.trackbacks = models(record.trackbacks, 'trackback') || [ ];                
                upload.sources    = models(record.sources, 'source') || [ ];                
                return me.findUser(upload.get('artist.login'));
            }).then( function(user) {
                upload.artist = user;
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
