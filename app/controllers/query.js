import PageableController from './pageable';

export default PageableController.extend({
    // queryParams is a concatenatedProperties
    queryParams: [ 'tags', 'sinced', 'search', 'lic', 'title' ],

});
