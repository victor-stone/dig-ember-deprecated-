/* globals Ember */
import PageableRoute from './pageable';

export default PageableRoute.extend({
    audioPlayer: Ember.inject.service(),

    routeQueryOptions: {
        matchAnyTags: false,
    },
    
    model: function() {
        var playlist = this.get('audioPlayer.playlist');
        return {
                playlist: playlist,
                total: playlist && playlist.length
            };
    }
});
