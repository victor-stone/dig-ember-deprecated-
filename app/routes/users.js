import PageableRoute from './pageable';

export default PageableRoute.extend({

    mergeOptions: function(obj,params) {
        return this._super({ u: params.user_id });
    }

});
