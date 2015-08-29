import PageableRoute from './pageable';

export default PageableRoute.extend({

    mergeOptions: function(params) {
        var qo = this.get('queryOptions');
        qo.set('licenseScheme','open');
        return this._super(params);
    },
});
