import Ember from 'ember';

export default Ember.Controller.extend({

    queryOptions: Ember.inject.service('query-options'),
    
    // UI model
    app_title: 'dig -> ccMixter',
    menu: [
            { name: 'free',
              linkto:  'free',
              title: 'Free for Commercial Use' }, 
            { name: 'licensed',
              linkto:  'ccplus',
              title: 'Royalty Free Licensed' }, 
            { name:'music for film',
              linkto: 'video',
              title: 'Music for Film and Video'}, 
            { name:'music for games',
              linkto: 'games',
              title: 'Music for Video Games'},
            { name: 'How it Works',
              url: '/#howitworks',
              title: 'How it Works' }
        ],
    licenses: [
            { title: 'All licenses', id: 'all' },
            { title: 'Free for commercial use', id: 'open' },
            { title: 'Royalty free license', id: 'ccplus' },
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
    
    searchCollector: '',
    
    // UI state
    optionsOpen: false,
    
    init: function() {
        this._super.apply(this,arguments);
        this.set('queryOptions.meta.recent.model', '6 weeks ago');
    },
    
    actions: {
        search: function() {
            this.set('queryOptions.searchText', this.searchCollector);
            this.transitionToRoute('dig');
        },
        toggleOptions: function() {
            this.toggleProperty('optionsOpen');
        },
    },
});

