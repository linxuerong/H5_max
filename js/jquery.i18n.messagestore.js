/*!
* jQuery Internationalization library - Message Store
*
* Copyright (C) 2012 Santhosh Thottingal
*
* jquery.i18n is dual licensed GPLv2 or later and MIT. You don't have to do anything special to
* choose one license or the other and you don't have to notify anyone which license you are using.
* You are free to use UniversalLanguageSelector in commercial projects as long as the copyright
* header is left intact. See files GPL-LICENSE and MIT-LICENSE for details.
*
* @licence GNU General Public Licence 2.0 or later
* @licence MIT License
*/(function($){'use strict';var MessageStore=function(){this.messages={};this.sources={};};function jsonMessageLoader(url){var deferred=$.Deferred();$.getJSON(url).done(deferred.resolve).fail(function(jqxhr,settings,exception){$.i18n.log('Error in loading messages from '+url+' Exception: '+exception);deferred.resolve();});return deferred.promise();}
MessageStore.prototype={load:function(source,locale){var key=null,deferreds=[],messageStore=this;if(typeof source==='string'){$.i18n.log('Loading messages from: '+source);return jsonMessageLoader(source).then(function(localization){return messageStore.load(localization,locale);});}
if(locale){messageStore.set(locale,source);return $.Deferred().resolve();}else{for(key in source){if(Object.prototype.hasOwnProperty.call(source,key)){locale=key;deferreds.push(messageStore.load(source[key],locale));}}
return $.when.apply($,deferreds);}},set:function(locale,messages){if(!this.messages[locale]){this.messages[locale]=messages;}else{this.messages[locale]=$.extend(this.messages[locale],messages);}},get:function(locale,messageKey){return this.messages[locale]&&this.messages[locale][messageKey];}};$.extend($.i18n.messageStore,new MessageStore());}(jQuery));