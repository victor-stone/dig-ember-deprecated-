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

    _setupWatcher: function() {
        this.get('queryOptions').on('onOptionBarChanged',this, this._watchForOptionBarChange);
    }.on('init'),

    _watchForOptionBarChange: function(hash) {
        if( this.get('optionsOpen') ) {
            var me = this;
            Ember.run.next( this, function() {
                var css = { height: Ember.$('.inner-qo').outerHeight() };
                var $qo = Ember.$('.query-opts');
                $qo.css(css);
                Ember.$('.inner-qo').slideUp(300,function() {
                    me.set('queryOptions.hidden',hash);
                    Ember.run.next( this, function() {
                        Ember.$('.inner-qo').slideDown(300,function() {
                            $qo.removeAttr('style');
                        });
                    });
                });
            });
        } else {
            this.set('queryOptions.hidden',hash);
        }
    },
    
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
                this.transitionToRoute(routeName).then(function() {
                    Ember.run.next(me,me.scrollToAnchor,anchor);
                });
            }
        },
    },
});

