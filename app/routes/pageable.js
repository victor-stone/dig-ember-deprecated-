import Ember from 'ember';
import TagUtils from '../lib/tags';

var tagUtils = TagUtils.create();

export default Ember.Route.extend({
    
    queryOptions: Ember.inject.service('query-options'),
    queryParams: {
        offset: { refreshModel: true },
    },
    routeQueryOptions: undefined,
    routeQueryParams: undefined,

    isOptionsChangeRefresh: false,
    
    init: function() {
        this._super.apply(this,arguments);
        this.get('queryOptions'); // observers don't hook up if you never do a get()
    },

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
                        target[k] = tagUtils.combineStrings(target.tags,val);
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
        }
    },
    
    _activateWatcher: function() {
            Ember.debug('Activating: ' + this.toString());
        }.on('activate'),
        
    sysDefaultQueryArgs: function() {
        return {    tags: 'remix', 
                    dataview: 'links_by',
                    limit: 10,
                    sort: 'rank',
                    ord: 'desc',
                    f: 'json',
                    _cache_bust: (new Date()).getTime(),                     
                };
        }.property(),
    
    translateDynamicParamsToQuery: function( /* params */ ) {
        },
    
    model: function(params,transition) {  
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
        
        var retModel = {
            playlist: [ ],
            total: 0
        };
        
        this.isOptionsChangeRefresh = false;
        
        var store = this.store;
        return store.query(qparams)
            .then( function(arr) {
                retModel.playlist = arr;
                qparams.f = 'count';
                return store.query(qparams); })
            .then( function(arr) {
                retModel.total = arr[0];
                return retModel;
            });
    },
});
