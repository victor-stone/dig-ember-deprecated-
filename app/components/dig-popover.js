import Ember from 'ember';

function chop(str) {
    if( str.length > 18 ) {
        return str.substr(0,12) + '...';
    }
    return str;
}

function artistHostClick(ev) {
    this.container.lookup('controller:application').transitionToRoute('users',ev.target.dataset.userId);
}

export default Ember.Component.extend({
    tagName: 'span',
    className: 'hidden',
    hasElement: false,
    
    artistSearch: function() {
        if( !this.get('model.length') ) {
            return;
        }
        var dataHook = 'data-user-id';
        var tmpl = '<li class="list-group-item">' +
                         '<button '+dataHook+'="{login}">' +
                            '<i class="fa fa-user"></i> {name}' +
                         '</button>' + 
                    '</li>';
        var r1 = new RegExp(/{login}/);
        var r2 = new RegExp(/{name}/);
        var html = '<ul class="list-group">';
        this.get('model').forEach( u => html += tmpl.replace(r1,u.artistLogin).replace(r2,chop(u.name)) );
        html += '</ul>';
        return {
                    title: 'Maybe an artist...?',
                    placement: 'right',
                    html: true,
                    content: html,
                    _dataHook: dataHook,
                    _click: artistHostClick
                };
    }.property('model'),
    
    _modelWatcher: function() {
        if( !this.get('hasElement') ) {
            return;
        }
        var hostName = this.get('host');
        var opts = this.get(hostName.camelize());
        opts.title += '<button class="close" data-dig-popover-close="x">&times;</button>';
        var key = '[data-popover-host="'+hostName+'"]';
        var $host = Ember.$(key);
        if( opts ) {
            try {
                $host.data('bs.popover').options.content = opts.content;
                $host.data('bs.popover').options.title = opts.title;
                $host.popover('show');
            } catch(e) {
                $host.popover(opts).popover('show');
            }
            var me = this;
            Ember.$('['+opts._dataHook+']').click( function(ev) {
                ev.stopPropagation();
                opts._click.apply(me,arguments);
                $host.popover('hide');
            });
            Ember.$('[data-dig-popover-close]').click( function() {
                $host.popover('hide');
            });
        } else {
            $host.popover('hide');
        }
    }.observes('hasElement','model'),
    
    didInsertElement() {
        this.set('hasElement',true);
    }
});
