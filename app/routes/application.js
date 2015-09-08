import Ember from 'ember';
import { Upload } from '../models/models';
import Media from '../mixins/media';

export default Ember.Route.extend({
    audioPlayer: Ember.inject.service(),

    init: function() {
        this._super.apply(this,arguments);
        Upload.reopen(Media);
    },
    
    actions: {
            doLicensePopup: function() {
                Ember.$('#licenseInfoPopupTriggerLink').click();
            },
                   
            togglePlay: function(upload) {
                if( upload ) {
                    var media = upload.get('media');
                    if( media ) {
                        media.togglePlay();
                    }
                }
            },
        },
});
