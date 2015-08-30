import Ember from 'ember';
import TagsUtil from '../lib/tags';

var QUERYOPTION_TYPE_VALUE = 'qotValue';
var QUERYOPTION_TYPE_BOOLEAN = 'qotBoolValue';
var QUERYOPTION_TYPE_ENUM = 'qotTagEnum';

var QueryOption = Ember.Object.extend({
    name: '',
    value: undefined,
    model: undefined,
    defaultValue: '',
    observeChange: true,
    queryParam: '',
    type: '',

    _prevEnumValue: undefined,
    types: { },
    convertToQueryParam: function(qparams,service) { 
            if( this.type ) {
                this.types[ this.type ](qparams,this,service);
            }
        },
    init: function() {
            this.set('value',this.get('defaultValue'));
            this.types[QUERYOPTION_TYPE_VALUE] = function(qparams,opt) {
                    qparams[opt.queryParam] = opt.get('value');
                };
            this.types[QUERYOPTION_TYPE_ENUM] = function(qparams,opt,service) {
                    var value = opt.get('value');
                    if( opt.queryParam === 'tags' ) {
                        var ts = service.tagUtils;
                        ts.replaceTagWithTag( opt._prevEnumValue, value );
                        opt._prevEnumValue = value;
                        value = ts.convertToString();
                    } else { 
                        // don't know what this means
                        // don't have to
                    }
                    qparams[opt.queryParam] = value;
                };
            this.types[QUERYOPTION_TYPE_BOOLEAN] = function(qparams,opt,service) {
                    if( opt.queryParam === 'tags' ) {
                        var ts = service.tagUtils;
                        ts.toggleTag(opt.get('model'),opt.get('value'));
                        qparams.tags = ts.convertToString();
                    } else {
                        if( opt.get('value') ) {
                            qparams[opt.queryParam] = opt.get('model');
                        }
                    }
                };
        }
});

var optionsMeta = [
        QueryOption.create( { name: 'searchText' ,
                              observeChange: false } ),
        QueryOption.create( { name: 'licenseScheme',
                              type: QUERYOPTION_TYPE_VALUE,
                              defaultValue: 'all',
                              queryParam: 'lic' }),
        QueryOption.create( { name: 'limit',
                              type: QUERYOPTION_TYPE_VALUE,
                              defaultValue: 10,
                              queryParam: 'limit' }),
        QueryOption.create( { name: 'genre',                            
                              type: QUERYOPTION_TYPE_ENUM,
                              defaultValue: '-',
                              queryParam: 'tags' }),
        QueryOption.create( { name: 'instrumentalOnly',
                              type: QUERYOPTION_TYPE_BOOLEAN,
                              defaultValue: false,
                              queryParam: 'tags',
                              model: 'instrumental' } ),
        QueryOption.create( { name: 'recent',
                              type: QUERYOPTION_TYPE_BOOLEAN,
                              defaultValue: false,
                              queryParam: 'sinced',
                              model: '3 months ago' } ),
    ]; 
    
export default Ember.Service.extend({
    _optionsMeta: { },
        
    tagUtils: TagsUtil.create({}),

    init: function() {
        this._super.apply(this,arguments);

        var me = this;
        function optionWatcher() {
            if( me.autoUpdate ) {
                me.updateOptions();
            }
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
    
    autoUpdate: true,
        
    queryParams: { },     

    meta: Ember.computed.alias('_optionsMeta'),

    updateOptions: function() {
        var qparams = { };
        for( var key in this._optionsMeta ) {
            this._optionsMeta[key].convertToQueryParam(qparams,this);
        }
        this.set('queryParams', qparams);
    },
        
    setBatch: function(options) {
        this.autoUpdate = false;
        for( var k in options ) {
            this.set(k,options[k]);
        }
        this.autoUpdate = false;
        this.updateOptions();
    }

});
