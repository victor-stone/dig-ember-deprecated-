import Ember from 'ember';

export function chop([text,count]) {

    text = text.string || text;
    if( text.length > count ) {
        return text.substr(0,count) + '...';
    }
    return text;
}

export default Ember.Helper.helper(chop);
