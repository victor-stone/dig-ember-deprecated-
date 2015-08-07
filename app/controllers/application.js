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
    menu: [
                { name: 'free',
                  tags: 'attribution',
                  title: 'Free as in Beer' }, 
                { name:'music for film',
                  tags: 'instrumental',
                  title: 'Music for Film and Video'}, 
                { name:'music for games',
                  tags: 'ccplus,instrumental',
                  title: 'Music for Video Games'},
                { name: 'How it Works',
                  hash: '#howitworks',
                  title: 'How it Works' }
            ],
    searchText: '',
    searchPlaceHolder: "genre, style, instrument, etc.",
    
    currentLicense: '',
    licenses: [
        { title: 'All licenses', id: 'all' },
        { title: 'Free for commercial use', id: 'open' }
    ],

    instrumentalOnlyText: 'Instrument Only',
    instrumentalOnly: false,
    
    limitLabelText: 'Results',
    limits: [ 10, 20, 50, 100 ],
    currentLimit: 10,
    
    optionsOpen: false,

    actions: {
        search: function() {
            var q = '/query?search=' + this.searchText;
            if( this.optionsOpen ) {
                q += '&limit=' + this.currentLimit;
                if( this.instrumentalOnly ) {
                    q += '&tags=instrumental';
                }
                if( this.currentLicense !== 'all' ) {
                    q += '&lic=' + this.currentLicense;
                }
            }
            this.transitionToRoute(q);
        },
        toggleOptions: function() {
            this.toggleProperty('optionsOpen');
        },
    }    
    
        
});
