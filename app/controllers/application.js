import Ember from 'ember';

export default Ember.Controller.extend({

    tagService: Ember.inject.service('tags'),
    
    // search state
    searchText: '',    
    licenseScheme: 'all',
    genre: '-',
    instrumentalOnly: false ,
    limit: 10,
    
    // UI model
    app_title: 'dig -> ccMixter',
    menu: [
            { name: 'free',
              lic: 'open',
              title: 'Free for Commercial Use' }, 
            { name:'music for film',
              tags: 'instrumental',
              title: 'Music for Film and Video'}, 
            { name:'music for games',
              tags: 'ccplus,instrumental',
              title: 'Music for Video Games'},
            { name: 'How it Works',
              url: '/#howitworks',
              title: 'How it Works' }
        ],
    licenses: [
            { title: 'All licenses', id: 'all' },
            { title: 'Free for commercial use', id: 'open' }
        ],
    genres: [
            { title: 'All genres', id: '-' },            
            { title: 'Hip Hop', id: 'hip_hop' },
            { title: 'Electronica', id: 'electronica' },
            { title: 'Rock', id: 'rock' },
            { title: 'Ambient', id: 'ambient' },
            { title: 'Dance', id: 'dance' },
            { title: 'Jazz', id: 'jazz' }
        ],    
    instrumentalOnlyText: 'Instrumentals Only',
    limitLabelText: 'Results',
    limits: [ 10, 20, 50, 100 ],
    searchPlaceHolder: "genre, style, instrument, etc.",
    
    // UI state
    optionsOpen: false,

    _computeTags: function() {
        var ts = this.get('tagService');
        var genreIds = this.genres.map( function(obj) { return obj.id; } );
        ts.replaceTagFrom( this.get('genre'), genreIds );        
        ts.toggleTag('instrumental',this.get('instrumentalOnly'));
        return ts.convertToString();
    },
    
    actions: {
        search: function() {
            var qparams = { };
            qparams.tags = this._computeTags();
            qparams.limit = this.get('limit');
            qparams.lic = this.get('licenseScheme');
            var searchText = this.get('searchText');
            if( searchText ) {
                qparams.title = 'Search results for "' + searchText + '"';
            } else {
                qparams.title = 'Listing';
            }
            this.transitionToRoute('query', { queryParams: qparams } );
        },
        toggleOptions: function() {
            this.toggleProperty('optionsOpen');
        },
    },
});

