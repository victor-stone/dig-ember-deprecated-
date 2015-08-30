import PageableController from './pageable';

export default PageableController.extend({

    searchTitle: function() {
        var str = this.get('queryOptions.searchText');
        if( str.length > 20 ) {
            str = str.substr(20) + '...';
        }
        if( str ) {
            str = 'Search results for "' + str + '"';
        } else {
            str = 'Dig the Music';
        }
        return str;
    }.property('queryOptions.searchText')

});
