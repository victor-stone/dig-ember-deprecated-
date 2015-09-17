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
        this.get('queryOptions').on('optionBarChanged',this, this._watchForOptionBarChange);
    }.on('init'),

    _watchForOptionBarChange: function(hash) {
        if( this.get('optionsOpen') ) {
            Ember.run.next( this, () => {
                var css = { height: Ember.$('.inner-qo').outerHeight() };
                var $qo = Ember.$('.query-opts');
                $qo.css(css);
                Ember.$('.inner-qo').slideUp(300, () => {
                    this.set('queryOptions.hidden',hash);
                    Ember.run.next( this, () => {
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
            var offset = 0; 
            Ember.$('html,body').animate({ scrollTop: Ember.$(anchor).offset().top - offset },
                    { duration: 'slow', easing: 'swing'});
            }
        catch( e ) {
            Ember.debug('wups ' + e.toString() );
        }
    },
        
    actions: {
        doDownloadPopup: function(upload) {            
            this.set('uploadForDownloadPopup', upload);
            Ember.run.next( this, () => Ember.$('#downloadPopup').modal('show') );
        },
        toggleOptions: function() {
            if(  this.toggleProperty('optionsOpen') ) {
                Ember.$('#query-opts').slideDown(600);
            }
            else {
                Ember.$('#query-opts').slideUp(400);
            }
        },
        showOptions: function() {
            if( !this.get('optionsOpen') ) {
                Ember.run.next(this,() => Ember.$('.query-options-toggle').click());
            }            
        },
        goToAnchor: function(routeName,anchor) {
            if( this.get('currentPath') === routeName ) {
                this.scrollToAnchor(anchor);
            } else {
                this.transitionToRoute(routeName).then(() => {
                    Ember.run.next(this,this.scrollToAnchor,anchor);
                });
            }
        },
    },
});

