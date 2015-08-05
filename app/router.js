import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('uploads', { path: '/files/:upload_id' } );
  this.route('users', { path: '/user/:user_id' } );
  this.route('query');
});

export default Router;
