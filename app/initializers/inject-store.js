import Store from 'dig8/models/store';

export default {
    name: 'inject-store',
    initialize: function(container, app) {
       // console.log('VICTOR: initializing inject-store');
        var STORE_MAIN = 'store:main';
        app.register(STORE_MAIN, Store);
        app.inject('route','store', STORE_MAIN);
        app.inject('controller','store', STORE_MAIN);
    }
};