import Ember from 'ember';

export function isEmbeddable([text]) {
    // TODO: put a whole bunch of video sniffing here
  return (typeof(text) === 'string') && text.match(/^</) !== null;
}

export default Ember.Helper.helper(isEmbeddable);
