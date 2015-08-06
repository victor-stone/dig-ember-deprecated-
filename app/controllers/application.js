import Ember from 'ember';

/*
            {{view "select"
                   content=licenseOptions
                   optionValuePath="content.id"
                   optionLabelPath="content.text"
                   selection=selectedLicense}}
                   
*/
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
    
    freeLicense: false,

    lic: function() {
            return this.freeLicense ? 'open' : '';
            }.property('freeLicense'),
    
    optionsOpen: true,

    actions: {
        search: function() {
            this.transitionToRoute('/query?search=' + this.searchText);
        },
        toggleOptions: function() {
            this.toggleProperty('optionsOpen');
        },
    }    
    
        
});
