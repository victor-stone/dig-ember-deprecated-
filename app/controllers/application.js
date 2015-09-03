import Ember from 'ember';

export default Ember.Controller.extend({

    queryOptions: Ember.inject.service('query-options'),
    
    // UI model
    app_title: 'dig -> ccMixter',
    menu: [
            { name: 'navbar.links.free',
              linkto:  'free',
              title: 'navbar.links.freetitle' }, 
            { name: 'navbar.links.ccplus',
              linkto:  'ccplus',
              title: 'navbar.links.ccplustitle' }, 
            { name:'navbar.links.film',
              linkto: 'video',
              title: 'navbar.links.filmtitle'}, 
            { name: 'navbar.links.games',
              linkto: 'games',
              title: 'navbar.links.gamestitle'},
            { name: 'navbar.links.how',
              url: '/#howitworks',
              title: 'navbar.links.howtitle' }
        ],
    licenses: [
            { title: 'queryOptions.licenses.all', id: 'all' },
            { title: 'queryOptions.licenses.free', id: 'open' },
            { title: 'queryOptions.licenses.ccplus', id: 'ccplus' },
        ],
    genres: [ 'all', 'hip_hop', 'electronica', 'rock', 'ambient', 'dance', 'country', 'jazz' ],
    limits: [ 10, 20, 50, 100 ],
    
    searchCollector: '',
    
    // UI state
    optionsOpen: false,
    
    /*
    init: function() {
        this._super.apply(this,arguments);
        this.set('queryOptions.meta.recent.model', '6 weeks ago');
    },
    */
    
    actions: {
        search: function() {
            this.set('queryOptions.searchText', this.searchCollector);
            this.transitionToRoute('dig');
        },
        toggleOptions: function() {
            this.toggleProperty('optionsOpen');
        },
        togglePlay: function(item) {
            if (item) {
                item.get('media').togglePlay();
            }
        },
    },
});

