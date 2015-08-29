import Ember from 'ember';

var QueryOption = Ember.Object.extend({
    name: '',
    value: undefined,
    model: undefined,
    defaultValue: '',
    observeChange: false,
    convertToQueryParam: function(/*service,qparams*/) { 
        },
    init: function() {
            this.set('value',this.get('defaultValue'));
        }
});

var optionsMeta = [
        QueryOption.create( { name: 'searchText' } ),
        QueryOption.create( { name: 'licenseScheme',
                              observeChange: true,
                              defaultValue: 'all',
                              convertToQueryParam: function(service,qparams) {
                                  qparams.lic = this.get('value');
                              }}),
        QueryOption.create( { name: 'genre',                            
                              observeChange: true,
                              model: [ ] ,
                             convertToQueryParam: function(service,qparams) {
                                  var ts = service.get('tagService');
                                  var genreIds = this.get('model').map( function(obj) { return obj.id; } );
                                  ts.replaceTagFrom( this.get('genre'), genreIds );
                                  qparams.tags = ts.convertToString();
                             }}),
        QueryOption.create( { name: 'instrumentalOnly',
                              defaultValue: false,
                              observeChange: true,
                              convertToQueryParam: function(service,qparams) {
                                  var ts = service.get('tagService');
                                  ts.toggleTag('instrumental',this.get('value'));
                                  qparams.tags = ts.convertToString();
                              }}),
        QueryOption.create( { name: 'limit',
                              defaultValue: 10,
                              observeChange: true,
                              convertToQueryParam: function(service,qparams) {
                                  qparams.limit = this.get('value');
                              }}),
        QueryOption.create( { name: 'recent',
                              observeChange: true,
                              defaultValue: 'false',
                              model: '3 months ago',
                              convertToQueryParam: function(service,qparams) {
                                  if( this.get('value') ) {
                                      qparams.sinced = this.get('model');
                                  }
                              }})           
    ]; 
    
export default Ember.Service.extend({
    tagService: Ember.inject.service('tags'),

    init: function() {
        this._super.apply(this,arguments);

        var me = this;
        function optionWatcher() {
            var qparams = { };
            for( var key in me._optionsMeta ) {
                me._optionsMeta[key].convertToQueryParam(me,qparams);
            }
            me.set('queryParams', qparams);
        }

        optionsMeta.forEach( function(optMeta) {
            var name = optMeta.get('name');
            me._optionsMeta[name] = optMeta;
            me.set(name, Ember.computed.alias('_optionsMeta.'+name+'.value'));
            if( optMeta.observeChange ) {
                optMeta.addObserver('value',optionWatcher);
            }
        });
    },
    
    _optionsMeta: { },
        
    // Data state
    queryParams: { },     

    setOptionModel: function(optionName,model) {
        this._optionsMeta[optionName].model = model;
    },
    
});
