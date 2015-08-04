import Ember from 'ember';

export default Ember.Controller.extend({
    title: 'dig -> ccMixter',
    menu: [ {name: 'free',
             tags: 'attribution',
             title: 'Free as in Beer' }, 
            {name:'film',
             tags: 'instrumental',
             title: 'Music for Film and Video'}, 
            {name:'games',
            tags: 'ccplus,instrumental',
            title: 'Music for Video Games'}
        ]
});
