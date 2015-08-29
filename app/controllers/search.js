import PageableController from './pageable';

export default PageableController.extend({

    searchTitle: function() {
        var str = this.get('queryOptions.searchText');
        if( str.length > 20 ) {
            str = str.substr(20) + '...';
        }
        return 'Search results for "' + str + '"';
    }.property('queryOptions.searchText')

});
