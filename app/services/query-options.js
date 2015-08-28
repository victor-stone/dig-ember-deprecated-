import Ember from 'ember';

export default Ember.Service.extend({
    tagService: Ember.inject.service('tags'),
    
    // Data state
    queryParams: { },     

    // search state/query options
    searchText: '',    
    licenseScheme: 'all',
    genre: '-',
    instrumentalOnly: false ,
    limit: 10,
    recent: false,
    
    defaultRecent: '3 months ago',
    genres: [ ],
    
    // manage query options
    _computeTags: function() {
        var ts = this.get('tagService');
        var genreIds = this.genres.map( function(obj) { return obj.id; } );
        ts.replaceTagFrom( this.get('genre'), genreIds );        
        ts.toggleTag('instrumental',this.get('instrumentalOnly'));
        return ts.convertToString();
    },
    
    _computeParams: function() {
        var qparams = { };
        qparams.tags   = this._computeTags();
        qparams.limit  = this.get('limit');
        qparams.lic    = this.get('licenseScheme');
        qparams.sinced = this.get('recent') ? this.get('defaultRecent') : undefined;
        return qparams;
    },
    
    _computeAndSetParams: function() {
            var qparams = this._computeParams(false) ;
            this.set('queryParams', qparams);
        },
        
    _queryOptionsWatcher: Ember.observer('limit', 
                                        'genre', 
                                        'licenseScheme', 
                                        'instrumentalOnly', 
                                        'recent',
             function() {
                Ember.run.once(this, '_computeAndSetParams');
          }),
});
