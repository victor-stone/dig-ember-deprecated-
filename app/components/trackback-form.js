import Ember from 'ember';

export default Ember.Component.extend({
    link: '',
    email: '',
    yourName: '',
    name: '',
    artist: '',
    embed: '',
    
    type: 'video',
    upload: 0,
    
    postData: function() {
        return {
            trackback_link: this.link,
            trackback_email: this.email,
            trackback_your_name: this.youName,
            trackback_name: this.name,
            trackback_artist: this.artist,
            trackback_media: this.embed            
        };
    }.property( 'link', 'yourName', 'name', 'artist', 'embed' ),

    postResult: '',

    typeIsVideo: function() {
        return this.get('type') === 'video';
    }.property('type'),
    
    actions: {
        post: function() {
                var url = 'http://ccmixter.org/track/' + this.get('type') + '/' + this.get('upload.id');
                var args = {
                      url: url,
                      method: 'POST',
                      data: this.postData,
                      dataType: 'text',
    //                contentType: 'application/x-www-form-urlencoded',
                    };
                var me = this;
                return Ember.RSVP.resolve(Ember.$.ajax(args))
                    .then( function(r) { 
                        me.postResult = r;
                        return r === 'ok';
                    });
        },
        cancel: function() {
        }
    },
});
