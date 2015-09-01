/* globals Ember */
import Store from './store';
import TagUtils from '../lib/tags';

var UploadModel = Ember.Object.extend( {

    player: Ember.inject.service(),

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
        var files = this.get('files');
        for( var i = 0; i < files.length; i++ ) {
            if( files[i].file_format_info["format-name"] === "audio-mp3-mp3" ) {
                return files[i].download_url;
            }
        }
        return null;
    }.property('files'),
    
    hasTag: function(tag) {
        return this.get('tags').contains(tag);
    },
    
    isLicenseReady: function() {
        return this.hasTag('ccplus');
    }.property('upload_tags'),

    licenseLogoUrl: function() {
        // TODO: Make this work to pull correct images from CCC
        return "images/" + this.get('license_name').dasherize() + '.png';
    }.property('license_name'),

    purchaseLicenseUrl: function() {
        var baseUrl = 'http://tunetrack.net/license/';
        return baseUrl + this.get('file_page_url').replace('http://', '');
    }.property('file_page_url'),

    // this stuff really should be on the controller
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
        return adapter.query( { ids: id, f: 'json' } )
            .then( function(json) {
                var record = json[0];
                return UploadModel.create(record);
            });
    },
  
});
