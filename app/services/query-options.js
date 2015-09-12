import Ember from 'ember';
import TagUtils from '../lib/tags';

var QUERYOPTION_TYPE_VALUE = 'qotValue';
var QUERYOPTION_TYPE_BOOLEAN = 'qotBoolValue';
var QUERYOPTION_TYPE_ENUM = 'qotTagEnum';

var QueryOption = Ember.Object.extend({
    name: '',
    value: undefined,
    model: undefined,
    defaultValue: '',
    updatesParams: true,
    honorUserEdit: true,
    queryParam: '',
    type: '',

    _prevEnumValue: undefined,
    types: { },
    convertToQueryParam: function(qparams,service) { 
            if( this.type ) {
                this.types[ this.type ].apply(this,[qparams,service]);
            }
        },
    init: function() {
            this.set('value',this.get('defaultValue')); // computed.defaultTo is deprecated
            this.types[QUERYOPTION_TYPE_VALUE] = function(qparams) {
                    qparams[this.queryParam] = this.get('value');
                };
            this.types[QUERYOPTION_TYPE_ENUM] = function(qparams,service) {
                    var value = this.get('value');
                    if( this.queryParam === 'tags' ) {
                        service._tags.replace( this._prevEnumValue, value );
                        this._prevEnumValue = value;
                        value = service._tags.toString();
                    } else { 
                        // don't know what this means
                        // don't have to
                    }
                    qparams[this.queryParam] = value;
                };
            this.types[QUERYOPTION_TYPE_BOOLEAN] = function(qparams,service) {
                    if( this.queryParam === 'tags' ) {
                        service._tags.toggle(this.get('model'),this.get('value'));
                        qparams.tags = service._tags.toString();
                    } else {
                        if( this.get('value') ) {
                            qparams[this.queryParam] = this.get('model');
                        }
                    }
                };
        }
});

var optionsMeta = [
        QueryOption.create( { name: 'searchText' ,
                              updatesParams: false } ),
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
                              defaultValue: '*',
                              queryParam: 'tags' }),
        QueryOption.create( { name: 'extraTags',                            
                              type: QUERYOPTION_TYPE_ENUM,
                              defaultValue: '*',
                              honorUserEdit: false,
                              queryParam: 'tags' }),
        QueryOption.create( { name: 'instrumentalOnly',
                              type: QUERYOPTION_TYPE_BOOLEAN,
                              defaultValue: false,
                              queryParam: 'tags',
                              model: 'instrumental,-vocals,-male_vocals,-female_vocals' } ),
        QueryOption.create( { name: 'recent',
                              type: QUERYOPTION_TYPE_BOOLEAN,
                              defaultValue: false,
                              queryParam: 'sinced',
                              model: '3 months ago' } ),
    ]; 
    
export default Ember.Service.extend(Ember.Evented, {
    queryParams: { },

    userEditing: false,

    setBatch: function(options) {
            this._killNotify = true;
            var valueProp = this.get('userEditing') ? 'value' : 'defaultValue';
            this._forEachUpdatingOption( function(opt) {
                var pValue = options[opt.name];
                var oValue = opt.get( opt.honorUserEdit ? valueProp : 'defaultValue');
                this.set(opt.name, pValue || oValue );
            });
            this._killNotify = false;
        },

    
    _optionsMeta: Ember.Object.create(),
        
    _tags: TagUtils.create(),

    _setupOptions: function() {    
        var me = this;
        Ember.debug('Setting up queryOptions');
        optionsMeta.forEach( function(optMeta) {
            var name = optMeta.get('name');
            me._optionsMeta.set(name,optMeta);
            me.set(name, Ember.computed.alias('_optionsMeta.'+name+'.value'));
            if( optMeta.updatesParams ) {
                optMeta.addObserver('value',me._optionChanged.bind(me));
            }
        });
    }.on('init'),
    
    _optionChanged: function() {
        this.queryParams = { };
        this._forEachUpdatingOption( function(opt) {
            opt.convertToQueryParam(this.queryParams,this);
        });
        if( !this._killNotify ) {
            this.trigger('optionsChanged');
        }
    },

    meta: Ember.computed.alias('_optionsMeta'),
    
    _killNotify: false,
        
    _forEachUpdatingOption: function( callback ) {            
            var meta = this._optionsMeta;
            for( var k in meta ) {
                if( meta[k].updatesParams ) {
                    callback.call(this,meta[k]);
                }
            }
        },
        
});
