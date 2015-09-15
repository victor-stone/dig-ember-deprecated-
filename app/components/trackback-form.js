import Ember from 'ember';

export default Ember.Component.extend({
    link: '',
    email: '',
    yourName: '',
    name: '',
    artist: '',
    embed: '',
    
    types: [ 'video', 'podcast', 'album', 'web'],
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

    message: '',
    messageType: '',
    
    typeIsVideo: function() {
        return this.get('type') === 'video';
    }.property('type'),
    
    validate: function() {
        return this.email.length && this.link.length;
    },
    
    actions: {
        post: function() {
                this.showValidationMessage = false;
                if( !this.validate() ) {
                    this.set('messageType','warning');
                    this.set('message','tbForm.missingFields');
                    return;
                }
                var host = 'http://ccmixter.org';
                var url = host + '/track/' + this.get('type') + '/' + this.get('upload.id');
                var args = {
                      url: url,
                      method: 'POST',
                      data: this.get('postData'),
                      dataType: 'text',
    //                contentType: 'application/x-www-form-urlencoded',
                    };
                return Ember.RSVP.resolve(Ember.$.ajax(args))
                    .then( r => { 
                        if( r === 'ok' ) {
                            this.set('messageType','success');
                            this.set('message','tbForm.success');
                        } else {
                            this.set('messageType','danger');
                            this.set('message','tbForm.wups');
                        }
                        return r === 'ok';
                    });
        },
        typeChange: function() {
            var i = this.$('#mtype')[0].selectedIndex;
            this.set( 'type', this.get('types')[i] );
        },
        
        cancel: function() {
            return true;
        }
    },
});
