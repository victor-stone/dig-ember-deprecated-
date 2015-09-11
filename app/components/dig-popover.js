import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'span',
    className: 'hidden',
    hasElement: false,
    
    _modelWatcher: function() {
        if( !this.get('hasElement') ) {
            return;
        }
        var type = this.get('type');
        
        if( type === 'artist-search-question' ) {
            var $dig = Ember.$('#dig');
            if( this.get('model.length') ) {
                var me = this;
                var html = '';
                this.get('model').forEach( u => html += '<button class="btn btn-sm" data-user-id="' + u.artistLogin + '">' + u.name + '</button> ' );
                var title = this.get('model.length') > 1 ? 'Did you mean one of these artists?' : 'Did you mean this artist?';
                title += ' <button class="btn btn-xs" data-dig-popover-close="x">&times;</button>';
                try {
                    $dig.data('bs.popover').options.content = html;
                    $dig.data('bs.popover').options.title = title;
                    $dig.popover('show');
                } catch(e) {
                    $dig.popover( {
                            title: title,
                            placement: 'bottom',
                            html: true,
                           // trigger: 'focus',
                            content: html
                        }).popover('show');
                }
                Ember.$('[data-user-id]').click( function(ev) {
                    ev.stopPropagation();
                    me.container.lookup('controller:application').transitionToRoute('users',ev.target.dataset.userId);
                    $dig.popover('hide');
                });
                Ember.$('[data-dig-popover-close]').click( function() {
                    $dig.popover('hide');
                });
            } else {
                $dig.popover('hide');
            }
        }
    }.observes('model','hasElement'),
    
    didInsertElement() {
        this.set('hasElement',true);
    }
});
