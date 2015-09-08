import Ember from 'ember';
import TagUtils from '../lib/tags';

export default Ember.Route.extend({
    audioPlayer: Ember.inject.service(),
    queryOptions: Ember.inject.service(),
    queryParams: {
        offset: { refreshModel: true },
    },
    routeQueryOptions: undefined,
    routeQueryParams: undefined,

    isOptionsChangeRefresh: false,
    
    _optionsWatcher: function() {
        Ember.debug('Signalled option change in curr route: ' + this.router.currentRouteName + ' while in ' + this.toString());
        if( (this.router.currentRouteName === this.routeName) && !this.isOptionsChangeRefresh ) {
            Ember.run.once( this, 'onOptionsChanged' );
        }
    }.observes('queryOptions.queryParams'),
    
    onOptionsChanged: function() {
        Ember.debug('Calling option refresh in route ' + this.routeName);
        this.isOptionsChangeRefresh = true;
        this.refresh();
    },

    safeMergeParameters: function(...paramHashes) {
        var target = {};
        Ember.merge(target,paramHashes[0]);

        for( var i = 1; i < paramHashes.length; i++ ) {
            var obj = paramHashes[i];
            for( var k in obj ) {
                var val = obj[k];
                if( typeof(val) !== 'undefined' ) {
                    if( k === 'tags' ) {                    
                        target[k] = TagUtils.combine(target.tags,val);
                    } else {
                        target[k] = val;
                    }
                }
            }
        }
        return target;
    },
        
    actions: {
        willTransition: function(transition) {
            Ember.debug('Will transition to: ' + transition.targetName + ' from ' + this.toString() );
            return true;
        },
        didTransition: function() {
            Ember.debug('Did transition to: ' + this.toString() );
            return true;
        },
        togglePlay: function() {
            this.get('audioPlayer').set('playlist',this.currentModel.playlist);
            return true;
        }
    },
    
    setupController: function(controller,model) {
        if( model.hasOwnProperty('playlist') ) {
            var nowPlaying = this.get('audioPlayer.nowPlaying');
            if( nowPlaying ) {
                var nowPlayingUpload = model.playlist.findBy('mediaUrl',nowPlaying.url);
                if( nowPlayingUpload ) {
                    nowPlayingUpload.set('media',nowPlaying);
                }
            }
        }
        this._super.apply(this,arguments);
    },
    _activateWatcher: function() {
            Ember.debug('Activating: ' + this.toString());
        }.on('activate'),
        
    sysDefaultQueryArgs: function() {
        return {    tags: '', 
                    dataview: 'links_by',
                    limit: 10,
                    sort: 'rank',
                    ord: 'desc',
                    reqtags: 'remix',
                    f: 'json',
                    _cache_bust: (new Date()).getTime(),                     
                };
        }.property(),
    
    translateDynamicParamsToQuery: function( /* params */ ) {
        },

    model: function(params,transition) {  
        return this._model(params,transition);
    },
    
    // _super is broken for async calls (was fixed, borked again, etc.)
    // use this call from .then() functions in derivations
    _model: function(params,transition) {  
        Ember.debug('Getting model for ' + this.toString() + ' isOptionsChangeRefresh('+this.isOptionsChangeRefresh+')');
        
        // app defaults
        var sysDefaults = this.get('sysDefaultQueryArgs');
                        
        // Route specific additions
        var routeParams = this.get('routeQueryParams');

        // query settings from UI (limit, genre, etc) 
        if( !this.isOptionsChangeRefresh && this.get('routeQueryOptions')) {
            // this route forces options on the user. update the UI
            this.get('queryOptions').setBatch( this.get('routeQueryOptions') );
        }
        var userOptions = this.get('queryOptions.queryParams');

        // Ember's dynamic url parts (/:user_id)
        var dynParams = this.translateDynamicParamsToQuery(params);

        // query parameters (?foo=bar&offset=20) -- Is is at good idea to give user this much power?
        var urlParams = transition.queryParams;

        var qparams = this.safeMergeParameters(sysDefaults,routeParams,userOptions,dynParams,urlParams);
        
        this.isOptionsChangeRefresh = false;
        
        var store = this.store;
        
        var retModel = {
            playlist: store.playlist(qparams),
            total:    store.count(qparams)
        };
        
        return Ember.RSVP.hash(retModel);
    },
    
});
