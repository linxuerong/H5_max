/*!
* jQuery Internationalization library
*
* Copyright (C) 2011-2013 Santhosh Thottingal, Neil Kandalgaonkar
*
* jquery.i18n is dual licensed GPLv2 or later and MIT. You don't have to do
* anything special to choose one license or the other and you don't have to
* notify anyone which license you are using. You are free to use
* UniversalLanguageSelector in commercial projects as long as the copyright
* header is left intact. See files GPL-LICENSE and MIT-LICENSE for details.
*
* @licence GNU General Public Licence 2.0 or later
* @licence MIT License
*/(function($){'use strict';var MessageParserEmitter=function(){this.language=$.i18n.languages[String.locale]||$.i18n.languages['default'];};MessageParserEmitter.prototype={constructor:MessageParserEmitter,emit:function(node,replacements){var ret,subnodes,operation,messageParserEmitter=this;switch(typeof node){case 'string':case 'number':ret=node;break;case 'object':subnodes=$.map(node.slice(1),function(n){return messageParserEmitter.emit(n,replacements);});operation=node[0].toLowerCase();if(typeof messageParserEmitter[operation]==='function'){ret=messageParserEmitter[operation](subnodes,replacements);}else{throw new Error('unknown operation "'+operation+'"');}
break;case 'undefined':ret='';break;default:throw new Error('unexpected type in AST: '+typeof node);}
return ret;},concat:function(nodes){var result='';$.each(nodes,function(i,node){result+=node;});return result;},replace:function(nodes,replacements){var index=parseInt(nodes[0],10);if(index<replacements.length){return replacements[index];}else{return '$'+(index+1);}},plural:function(nodes){var count=parseFloat(this.language.convertNumber(nodes[0],10)),forms=nodes.slice(1);return forms.length?this.language.convertPlural(count,forms):'';},gender:function(nodes){var gender=nodes[0],forms=nodes.slice(1);return this.language.gender(gender,forms);},grammar:function(nodes){var form=nodes[0],word=nodes[1];return word&&form&&this.language.convertGrammar(word,form);}};$.extend($.i18n.parser.emitter,new MessageParserEmitter());}(jQuery));