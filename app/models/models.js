/* globals Ember */
import TagUtils from '../lib/tags';
import LicenseUtils from '../lib/licenses';

var Model = Ember.Object.extend({
});

var UploadBasic = Model.extend( {
    artistBinding: 'user_real_name',
    nameBinding: 'upload_name',
    urlBinding:  'file_page_url',
    idBinding: 'upload_id',
});

var Remix = UploadBasic.extend();

var Trackback = Model.extend( {
    artistBinding: 'pool_item_artist',
    nameBinding: 'pool_item_name',
    urlBinding: 'pool_item_url',
    
    embedBinding: 'pool_item_extra.embed',
    typeBinding: 'pool_item_extra.ttype',
});

export var Upload = UploadBasic.extend({

    idBinding: 'upload_id',
    artistLoginBinding: 'user_name',

    fileInfo: function() {
        var files = this.get('files');
        for( var i = 0; i < files.length; i++ ) {
            if( files[i].file_format_info["format-name"] === "audio-mp3-mp3" ) {
                return files[i];
            }
        }
    }.property('files'),

    mediaUrl: function() {
        return this.get('fplay_url') || this.get('fileInfo').download_url;
    }.property('files'),
    
    mediaTags: function() {
        return {
            name: this.get('name'),
            artist: this.get('artist'),
            artistLogin: this.get('artistLogin'),
            id: this.get('id'),
        };
    }.property('files'),
    
});

var User = Model.extend( {
    nameBinding: 'user_real_name',
    avatarUrlBinding: 'user_avatar_url',
});

var Detail = Upload.extend( {

    tags: function() {
        return TagUtils.create( { source: this.get('upload_tags') } );
    }.property('upload_tags'),
    
    userTags: function() {
        return TagUtils.create( { source: this.get('upload_extra.usertags') } );
    }.property('upload_extra'),
    
    hasTag: function(tag) {
        return this.get('tags').contains(tag);
    },
    
    featuringBinding: 'upload_extra.featuring',
    avatarUrlBinding: 'user_avatar_url',
    
    // License stuff 
    
    licenseNameBinding: 'license_name',
    licenseUrlBinding: 'license_url',
    
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
        
});

function _wrap(param,model) {
    if( Ember.isArray(param) ) {
        return param.map( o => model.create(o) );
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
            return result => _wrap(result,models[param]);
        }
        return _wrap(param,models[model]);
    }

