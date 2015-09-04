/* globals Ember */
import Store from './store';
import TagUtils from '../lib/tags';

var UploadModel = Ember.Object.extend( {

    id: Ember.computed.alias('upload_id'),
    title: Ember.computed.alias('upload_name'),
    uploader: Ember.computed.alias('user_name'),
    licenseName: Ember.computed.alias('license_name'),
    
    tags: function() {
        return TagUtils.create( { source: this.get('upload_tags') } );
    }.property('upload_tags'),
    
    userTags: function() {
        return TagUtils.create( { source: this.get('upload_extra.usertags') } );
    }.property('upload_extra'),

    streamUrl: function() {
        return this.get('fplay_url') || this.get('fileInfo').download_url;
    }.property('files'),
    
    fileInfo: function() {
        var files = this.get('files');
        for( var i = 0; i < files.length; i++ ) {
            if( files[i].file_format_info["format-name"] === "audio-mp3-mp3" ) {
                return files[i];
            }
        }
        return this._dummyInfo;
    }.property('files'),
    
    hasTag: function(tag) {
        return this.get('tags').contains(tag);
    },
    
    featuring: Ember.computed.alias('upload_extra.featuring'),
    
    isCCPlus: function() {
        return this.hasTag('ccplus');
    }.property('upload_tags'),

    isOpen: function() {
        return this.hasTag('attribution,cczero');
    }.property('upload_tags'),
    
    licenseYear: function() {
        return this.get('year') || (this.get('upload_date') || this.get('upload_date_format')).match(/(19|20)[0-9]{2}/)[0];
    }.property(),
    
    purchaseLicenseUrl: function() {
        var baseUrl = 'http://tunetrack.net/license/';
        return baseUrl + this.get('file_page_url').replace('http://', '');
    }.property('file_page_url'),
        
    // this stuff really should be on the controller
    player: Ember.inject.service(),
    isPlaying: Ember.computed.alias('media.isPlaying'),
    media: function() {
        return this.get('player').media({
                track:            this,
                artistBinding:    'track.user_name',
                titleBinding:     'track.upload_name',
                mp3UrlBinding:    'track.streamUrl'
            });
    }.property(),

    
});

export default Store.extend({
    find: function(name,id) {
        Ember.debug('UPLOADS Store: Looking for adapter: ' + name + ' (using :query)');
        var adapter = this.container.lookup('adapter:query');
        var uploadQ = {
            ids: id,
            f: 'json',
            // use default dataview
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
        return Ember.RSVP.hash(queries)
            .then( function(record) {
                record.upload.remixes = record.remixes || [ ];
                record.upload.trackbacks = record.trackbacks || [ ];
                return UploadModel.create(record.upload);
            });
    },
    
    info: function(id) {
        var adapter = this.container.lookup('adapter:query');
        var uploadQ = {
            ids: id,
            f: 'json',
            // use default dataview
        };
        return adapter.queryOne(uploadQ)
                .then( function(upload) {
                    return UploadModel.create(upload);
                });
    }
  
});
