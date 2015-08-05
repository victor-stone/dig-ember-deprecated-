import Ember from 'ember';

export default Ember.Controller.extend({
    title: 'dig -> ccMixter',
    menu: {
        queries: [ 
                { name: 'free',
                  tags: 'attribution',
                  title: 'Free as in Beer' }, 
                { name:'music for film',
                  tags: 'instrumental',
                  title: 'Music for Film and Video'}, 
                { name:'music for games',
                  tags: 'ccplus,instrumental',
                  title: 'Music for Video Games'}
            ],
        hashrefs: [
                { name: 'How it Works',
                  hash: '#howitworks',
                  title: 'How it Works' }
            ]
        },
    searchText: '',
    searchPlaceHolder: "genre, style, instrument, etc.",
    
    isExpanded: false,

    actions: {
        search: function() {
            this.transitionToRoute('/query?search=' + this.searchText);
        },
        expand: function() {
            this.set('isExpanded', true);
        },
        contract: function() {
            this.set('isExpanded', false);
        }
    }    
    
        
});
