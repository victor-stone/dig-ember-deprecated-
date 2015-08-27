/* global FastBoot */

import Ember from 'ember';

export default Ember.Object.extend( {

    params: {},
    _makeQ: function(qparams) {
        var q = '';
        qparams._cache_bust = (new Date()).getTime();
        for( var p in qparams ) {
            if( q !== '' ) { q += '&'; }
            if( qparams[q] !== '' ) { q += p + '=' + qparams[p]; }
        }
        return q;
    },
    _query: function(qString) {
        var url = 'http://ccmixter.org/api/query?' + qString;
        function success( json ) {
            var arr = eval(json);
            return arr;
        }        
        
        if (typeof FastBoot !== 'undefined') {        
            FastBoot.debug('Using NodeJS for AJAX');
            var ajax = this.container.lookup('ajax:node');
            return ajax( url, 'GET', {} ).then( success );
        } else {
            var args = {
                  url: url,
                  method: 'GET',
                  dataType: 'json'
                };
            return Ember.RSVP.resolve(Ember.$.ajax(args));      
        }
    },
    query: function(params) {
        var qparams = {
            limit: 10,
            sort: 'rank',
            ord: 'desc',
            f: 'json'
        };
        Ember.merge(qparams,params || this.params);
        var qString = this._makeQ(qparams);
        return this._query(qString);
    },
    find: function(name,params) {
        if( Ember.typeof(params) === 'string' ) {    
            return this._query(params);
        }
        return this.query(params);
    }
});