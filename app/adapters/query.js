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
    _query: function(q) {
        var url = 'http://ccmixter.org/api/query?' + q;
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
        var qparams = params || this.params;
        qparams['f'] = qparams['f'] || qparams['format'] || 'json';
        qparams['limit'] = qparams['limit'] || 10;
        var q = this._makeQ(qparams);
        return this._query(q);
    },
    find: function(name,params) {
        if( typeof params === 'string' ) {    
            return this._query(params);
        }
        return this.query(params);
    }
});