import Ember from 'ember';

export function isEmbeddable(params/*, hash*/) {
    // TODO: put a whole bunch of video sniffing here
  return params && params[0] && (typeof(params[0]) === 'string') && params[0].match(/^</) !== null;
}

export default Ember.Helper.helper(isEmbeddable);
