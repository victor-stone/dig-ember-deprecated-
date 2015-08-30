import Ember from 'ember';
import TagUtils from '../lib/tags';

var tagUtils = TagUtils.create();

export default Ember.Route.extend({
    queryOptions: Ember.inject.service('query-options'),
    queryParams: {

        limit:  { refreshModel: true },
        offset: { refreshModel: true },

    },

    init: function() {
        this._super.apply(this,arguments);
        this.get('queryOptions'); // observers don't hook up if you never do a get()
    },

    _optionsWatcher: function() {
        Ember.run.once( this, 'onOptionsChanged' );
    }.observes('queryOptions.queryParams'),
    
    onOptionsChanged: function() {
        if( this.router.currentRouteName === this.routeName ) {
            this.refresh();
        }
    },

    safeMergeParameters: function(obj1,obj2) {
        var target = {};
        Ember.merge(target,obj1);
        var hasTags = target.hasOwnProperty('tags');
        for( var k in obj2 ) {
            var val = obj2[k];
            if( typeof(val) !== 'undefined' ) {
                if( hasTags && k === 'tags' ) {
                    target[k] = tagUtils.combineStrings(target.tags,val);
                } else {
                    target[k] = val;
                }
            }
        }
        return target;
    },
        
    mergeOptions: function(obj /*, params */) {
        var options = this.get('queryOptions.queryParams');
        return this.safeMergeParameters(obj,options);
    },
    
    model: function(params,transition) {  

        var sysDefaults = { tags: 'remix', 
                            dataview: 'links_by',
                            limit: 10,
                            sort: 'rank',
                            ord: 'desc',
                            f: 'json',
                            _cache_bust: (new Date()).getTime(),                     
                        };
                        
        // merge query parameters (?foo=bar&offset=20) into sys defaults
        var qparams = this.safeMergeParameters( sysDefaults, transition.queryParams );

        // merge user query settings (limit, genre, etc) 
        // pass ember url params (/files/:_id) as a reference for derivations
        qparams = this.mergeOptions(qparams, params);

        var retModel = {
            playlist: [ ],
            total: 0
        };
        
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
