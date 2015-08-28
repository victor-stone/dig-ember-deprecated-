import Ember from 'ember';

export default Ember.Controller.extend({

    queryOptions: Ember.inject.service('query-options'),
    
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
    recentText: 'Recent',
    
    // UI state
    optionsOpen: false,
    
    init: function() {
        this._super.apply(this,arguments);
        this.get('queryOptions').set('genres', this.get('genres'));
    },
    
    actions: {
        search: function() {
            var qo = this.get('queryOptions');
            var qparams = Ember.merge( {}, qo.queryParams );
            qparams.search = qo.get('searchText');
            qparams.title = 'Search results for "' + qparams.search + '"';
            this.transitionToRoute('search', { queryParams: qparams } );
        },
        toggleOptions: function() {
            this.toggleProperty('optionsOpen');
        },
    },
});

