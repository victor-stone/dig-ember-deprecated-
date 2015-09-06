/* globals Ember */
import PageableController from './pageable';
import { translationMacro as t } from "ember-i18n";

export default PageableController.extend({
    i18n: Ember.inject.service(),

    _titleWithStr: t( 'dig.titleWithStr', { str: 'queryOptions.searchText' } ).property('queryOptions.searchText'),
    _title: t('dig.title'),
        
    title: function() {
        return this.get( this.get('queryOptions.searchText') ? '_titleWithStr' : '_title' );
    }.property('queryOptions.searchText')

});
