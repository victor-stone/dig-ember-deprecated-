import PageableController from './pageable';

export default PageableController.extend({

    // queryParams is a concatenatedProperties
    queryParams: [ 'tags', 'title', 'sinced', 'search', 'lic' ],
    
    app_title: 'dig -> ccMixter',
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
    searchPlaceHolder: "genre, style, instrument, etc.",

    licenses: [
        { title: 'All licenses', id: 'all' },
        { title: 'Free for commercial use', id: 'open' }
    ],
    
    instrumentalOnlyText: 'Instrument Only',
    instrumentalOnly: false,

    limitLabelText: 'Results',
    limits: [ 10, 20, 50, 100 ],
        
    optionsOpen: false,

    actions: {
        search: function() {
            this.transitionToRoute('query');
        },
        toggleOptions: function() {
            this.toggleProperty('optionsOpen');
        },
        queryParam: function(key,value) {
            this.set(key,value);
            this.transitionToRoute('query');
        }
    }    
            
});
