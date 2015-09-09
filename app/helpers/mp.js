import Ember from 'ember';

export function mp(params/*, hash*/) {
  return params.join('.');
}

export default Ember.Helper.helper(mp);
