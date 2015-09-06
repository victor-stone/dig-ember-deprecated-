/* globals Ember */
import TagUtils from '../lib/tags';
import LicenseUtils from '../lib/licenses';

var Model = Ember.Object.extend();

var UploadBasic = Model.extend( {
    artist: Ember.computed.alias('user_real_name'),
    name: Ember.computed.alias('upload_name'),
    url:  Ember.computed.alias('file_page_url'),
});

var Remix = UploadBasic.extend();

var Trackback = Model.extend( {
    artist: Ember.computed.alias('pool_item_artist'),
    name: Ember.computed.alias('pool_item_name'),
    url: Ember.computed.alias('pool_item_url'),
    
    embed: Ember.computed.alias('pool_item_extra.embed'),
    type: Ember.computed.alias('pool_item_extra.ttype'),
});

var Upload = UploadBasic.extend({

    artist: Ember.computed.alias('user_real_name'),
    name: Ember.computed.alias('upload_name'),
    url: Ember.computed.alias('file_page_url'),

    id: Ember.computed.alias('upload_id'),
    artistLogin: Ember.computed.alias('user_name'),
 
});

var User = Model.extend( {
    name: Ember.computed.alias('user_real_name'),
    avatarUrl: Ember.computed.alias('user_avatar_url'),
});

var Detail = Upload.extend( {

    
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
    
    // License stuff 
    
    licenseName: Ember.computed.alias('license_name'),
    licenseUrl: Ember.computed.alias('license_url'),
    
    isCCPlus: function() {
        return this.hasTag('ccplus');
    }.property('upload_tags'),

    isOpen: function() {
        return this.hasTag('attribution,cczero');
    }.property('upload_tags'),
    
    licenseLogoUrl: function() {
        return LicenseUtils.logoUrlFromName( this.get('license_name') );
    }.property('license_name'),
    
    licenseYear: function() {
        return this.get('year') || (this.get('upload_date') || this.get('upload_date_format')).match(/(19|20)[0-9]{2}/)[0];
    }.property(),
    
    purchaseLicenseUrl: function() {
        var baseUrl = 'http://tunetrack.net/license/';
        return baseUrl + this.get('file_page_url').replace('http://', '');
    }.property('file_page_url'),
        
    // this stuff really should be on the controller
    audioPlayer: Ember.inject.service(),
    isPlaying: Ember.computed.alias('media.isPlaying'),
    media: function() {
        return this.get('audioPlayer').media({
                track:            this,
                artistBinding:    'track.user_name',
                titleBinding:     'track.upload_name',
                mp3UrlBinding:    'track.streamUrl'
            });
    }.property(),

    
});

function _wrap(param,model) {
    if( Ember.isArray(param) ) {
        return param.map( function(o) { return model.create(o); } );
    }
    return model.create(param);
}

var models = {
    remix: Remix,
    trackback: Trackback,
    detail: Detail,
    upload: Upload,
    user: User
};

export default function modelWrap(param,model) {
        if( typeof(model) === 'undefined' ) {
            model = param;
            return function _modelWrapper(result) {
                return _wrap(result,models[model]);
            };
        }
        return _wrap(param,models[model]);
    }

