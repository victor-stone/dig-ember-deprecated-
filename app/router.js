import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('uploads', { path: '/files/:user/:upload_id' } );
  this.route('users', { path: '/people/:user_id' });
  this.route('query');
  this.route('dig');
  this.route('free');
  this.route('video');
  this.route('ccplus');
  this.route('games');
  this.route('morelike', { path: '/morelike/:upload_id' } );
  this.route('licenses');
  this.route('nowplaying');

  this.route('unknown-upload');
});

export default Router;
