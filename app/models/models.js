/* globals Ember */
import TagUtils from '../lib/tags';
import LicenseUtils from '../lib/licenses';

/**
    Module exists to normalize the wild & crazy results from the query API.
    
    For all models there are some consistent naming (if not always present - sigh):
    
    These include: .id, .name, .url  The 'url' property always points to a page at ccMixter
    (Except Trackback - the url property points at the original website.)
    
    So all models that represent uploads/media (Upload, Remix, Trackback) have the
    same properties. 
    
    Access properties related to the artist through the artist object on the upload:
    
       upload.name         -> upload_name
       upload.url          -> file_page_url
       upload.artist.name  -> user_real_name
       upload.artist.url   -> artist_page_url
       upload.artist.login -> user_name
    
    for UploadDetail there is additionally remixes and trackbacks (adding in the store)
    
        upload.remixes[0].name
        upload.remixes[0].artist.name
        
        upload.trackbacks[0].name
    
    The audio player will add a .media object that needs to have a .name, .artist.name and 
    .artist.login for the player to display. These are added below in a callback from 
    the player.
    
*/

function reBind(props)
{
    var model = Model.create();
    for( var k in props ) {
        if( typeof props[k] === 'string' ) {
            model.set(k, Ember.computed.alias(props[k]));
        } else {
            model.set(k,props[k]);
        }
    }
    return model;
}

var Model = Ember.Object.extend({
});

var UploadBasic = Model.extend( {
    nameBinding: 'upload_name',
    urlBinding:  'file_page_url',
    idBinding: 'upload_id',
    
    artistProperties: function() {
        return {
                upload: this,
                name: 'upload.user_real_name',
            };
    },
    
    _setupArtist: function() {
        this.set( 'artist', reBind( this.artistProperties() ) );
    }.on('init'),
    
});

var Remix = UploadBasic.extend();

var Trackback = Model.extend( {
    nameBinding: 'pool_item_name',
    urlBinding: 'pool_item_url',
    
    embedBinding: 'pool_item_extra.embed',
    typeBinding: 'pool_item_extra.ttype',
    
    _setupArtist: function() {
        this.set('artist', reBind({
            trackback: this,
            name: 'trackback.pool_item_artist'
        }));
    }.on('init'),
});

export var Upload = UploadBasic.extend({

    idBinding: 'upload_id',

    fileInfo: function() {
        var files = this.get('files');
        for( var i = 0; i < files.length; i++ ) {
            if( files[i].file_format_info['media-type'] === "audio" ) {
                return files[i];
            }
        }
    }.property('files'),

    mediaUrl: function() {
        return this.get('fplay_url') || this.get('download_url') || this.get('fileInfo.download_url');
    }.property('files'),
    
    mediaTags: function() {
        return {
            name: this.get('name'),
            id: this.get('id'),
            artist: {
                    name: this.get('artist.name'),
                    login: this.get('artist.login'),
                },
        };
    }.property('files'),
    
    artistProperties: function() {
        return Ember.merge( this._super(), { login: 'upload.user_name' } );
    },
    
});

var UserBasic = Model.extend( {
    nameBinding: 'user_real_name',
    loginBinding: 'user_name',
});

var User = UserBasic.extend( {
    avatarUrlBinding: 'user_avatar_url',

    url: function() {
        return this.get('artist_page_url') + '/profile';
    }.property('artist_page_url'),
    
    homepage: function() {
        if( this.get('user_homepage') === this.get('artist_page_url') ) {
            return null;
        }
        return this.get('user_homepage');
    }.property('user_homepage','artist_page_url'),
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
        if( this.get('isCCPlus') ) {
            var baseUrl = 'http://tunetrack.net/license/';
            return baseUrl + this.get('file_page_url').replace('http://', '');
        }
    }.property('file_page_url','isCCPlus'),

    purchaseLogoUrl: function() {
        if( this.get('isCCPlus') ) {
            return LicenseUtils.logoUrlFormAbbr( 'ccplus' );
        }
    }.property('isCCPlus'),
    
    artistProperties: function() {
        return Ember.merge( this._super(), { avatarUrl: 'upload.user_avatar_url' } );
    },
});

var Tag = Model.extend( {
    nameBinding: 'tags_tag',
    countBinding: 'tags_count'
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
    user: User,
    tag: Tag,
    userBasic: UserBasic
};

export default function modelWrap(param,model) {
        if( typeof(model) === 'undefined' ) {
            return result => _wrap(result,models[param]);
        }
        return _wrap(param,models[model]);
    }

