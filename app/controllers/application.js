import Ember from 'ember';

export default Ember.Controller.extend({

    audioPlayer: Ember.inject.service(),
    
    queryOptions: Ember.inject.service(),

    licenseInfo: function() {
        var licController = this.container.lookup('controller:licenses');
        return licController.get('licenseInfo');
    }.property(),
        
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
              anchor: 'howitworks',
              route: 'index',
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
    optionsOpen: Ember.computed.alias('queryOptions.userEditing'),

    scrollToAnchor: function(name) {
        try {    
            var anchor = Ember.$('a[name="'+name+'"]');
            var offset = 0; // incNav ? $jq('#myNav_div').height() : 0;
            Ember.$('html,body').animate({ scrollTop: Ember.$(anchor).offset().top - offset },
                    { duration: 'slow', easing: 'swing'});
            }
        catch( e ) {
            Ember.debug('wups ' + e.toString() );
        }
    },
        
    actions: {
        search: function() {
            this.set('queryOptions.searchText', this.searchCollector);
            this.transitionToRoute('dig');
        },
        toggleOptions: function() {
            if( this.get('optionsOpen') ) {
                Ember.$('#query-opts').slideUp(400);
            }
            else {
                Ember.$('#query-opts').slideDown(600);
            }
            this.toggleProperty('optionsOpen');
        },
        goToAnchor: function(routeName,anchor) {
            if( this.get('currentPath') === routeName ) {
                this.scrollToAnchor(anchor);
            } else {
                var me = this;
                this.transitionToRoute(routeName).then(function(route) {
                    Ember.run.next(me,me.scrollToAnchor,anchor);
                });
            }
        },
    },
});

