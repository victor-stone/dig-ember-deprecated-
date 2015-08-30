import PageableRoute from './pageable';

export default PageableRoute.extend({

    mergeOptions: function(params) {
        params.search = this.get('queryOptions.searchText');
        return this._super(params);
    },
    
    _searchTextWatcher: function() {
        this.onOptionsChanged();
    }.observes('queryOptions.searchText'),

});
