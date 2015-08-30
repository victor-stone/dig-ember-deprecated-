import PageableRoute from './pageable';

var routeMap = {
    open: 'free',
    ccplus: 'ccplus',
    all: 'dig'
};
        

export default PageableRoute.extend({
    scheme: 'all',
    
    onOptionsChanged: function() {
        var needSuper = true;
        if( this.router.currentRouteName === this.routeName ) {
            var selectedScheme = this.get('queryOptions.licenseScheme');
            if( selectedScheme !== this.scheme ) {
                this.transitionTo(routeMap[selectedScheme]);
                needSuper = false;
            }
        } 
        
        if( needSuper ) {
            this._super();
        }
    },
    
    mergeOptions: function(params) {
        var qo = this.get('queryOptions');
        qo.setBatch( {
            instrumentalOnly: true,
            licenseScheme: this.scheme,
            genre: '-',
            recent: false
        });
        return this._super(params);
    },
});
