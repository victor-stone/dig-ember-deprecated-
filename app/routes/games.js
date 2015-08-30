import PageableRoute from './pageable';
import TagUtils from '../lib/tags';

var tagUtils = TagUtils.create();

export default PageableRoute.extend({

    mergeOptions: function(params) {
        var qo = this.get('queryOptions');
        qo.setBatch( {
            instrumentalOnly: true,
            licenseScheme: 'all',
            genre: '-',
            recent: false
        });
        this._super(params);
        params.tags = tagUtils.combineStrings(params.tags,'loops'); // haha
        return params;
    },
});
