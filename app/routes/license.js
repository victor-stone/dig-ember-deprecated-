import PageableRoute from './pageable';

var routeMap = {
    open: 'free',
    ccplus: 'ccplus',
    all: 'dig'
};
        

export default PageableRoute.extend({
    
    onOptionsChanged: function() {
        var needSuper = true;
        if( this.router.currentRouteName === this.routeName ) {
            var selectedScheme = this.get('queryOptions.licenseScheme');
            if( selectedScheme !== this.routeQueryOptions.licenseScheme ) {
                this.transitionTo(routeMap[selectedScheme]);
                needSuper = false;
            }
        } 
        
        if( needSuper ) {
            this._super();
        }
    },
    
});
