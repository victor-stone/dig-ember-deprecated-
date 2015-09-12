/* globals Ember */
import PageableController from './pageable';
import { translationMacro as t } from "ember-i18n";

export default PageableController.extend({
    i18n: Ember.inject.service(),
    
    _title: t( 'morelike.title'), 
    title: function() {
        return '<small>' + this.get('_title') + '</small> ' + this.get('model.trackTitle');
    }.property('model'),

});
