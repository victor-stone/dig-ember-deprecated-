import PageableRoute from './pageable';

export default PageableRoute.extend({

    model: function(params) {  
        var qparams = this.mergeOptions({ u: params.user_id });
        return this.store.query(qparams);
    },

});
