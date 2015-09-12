/* globals Ember */
import PageableController from './pageable';
import { translationMacro as t } from "ember-i18n";

export default PageableController.extend({
    i18n: Ember.inject.service(),

    _titleWithStr: t( 'dig.titleWithStr' ),
    _title: t('dig.title'),
        
    title: function() {
        var text = this.get('queryOptions.searchText');
        if( text ) {
            return '<small>' + this.get('_titleWithStr') + '</small> ' + text;
        }
        return this.get('_title');
    }.property('queryOptions.searchText')

});
