(function(root,factory){if(typeof define==='function'&&define.amd){define(factory);}else if(typeof exports==='object'){module.exports=factory();}else{root.pluralRuleParser=factory();}}(this,function(){function pluralRuleParser(rule,number){'use strict';rule=rule.split('@')[0].replace(/^\s*/,'').replace(/\s*$/,'');if(!rule.length){return true;}
var pos=0,operand,expression,relation,result,whitespace=makeRegexParser(/^\s+/),value=makeRegexParser(/^\d+/),_n_=makeStringParser('n'),_i_=makeStringParser('i'),_f_=makeStringParser('f'),_t_=makeStringParser('t'),_v_=makeStringParser('v'),_w_=makeStringParser('w'),_is_=makeStringParser('is'),_isnot_=makeStringParser('is not'),_isnot_sign_=makeStringParser('!='),_equal_=makeStringParser('='),_mod_=makeStringParser('mod'),_percent_=makeStringParser('%'),_not_=makeStringParser('not'),_in_=makeStringParser('in'),_within_=makeStringParser('within'),_range_=makeStringParser('..'),_comma_=makeStringParser(','),_or_=makeStringParser('or'),_and_=makeStringParser('and');function debug(){}
debug('pluralRuleParser',rule,number);function choice(parserSyntax){return function(){var i,result;for(i=0;i<parserSyntax.length;i++){result=parserSyntax[i]();if(result!==null){return result;}}
return null;};}
function sequence(parserSyntax){var i,parserRes,originalPos=pos,result=[];for(i=0;i<parserSyntax.length;i++){parserRes=parserSyntax[i]();if(parserRes===null){pos=originalPos;return null;}
result.push(parserRes);}
return result;}
function nOrMore(n,p){return function(){var originalPos=pos,result=[],parsed=p();while(parsed!==null){result.push(parsed);parsed=p();}
if(result.length<n){pos=originalPos;return null;}
return result;};}
function makeStringParser(s){var len=s.length;return function(){var result=null;if(rule.substr(pos,len)===s){result=s;pos+=len;}
return result;};}
function makeRegexParser(regex){return function(){var matches=rule.substr(pos).match(regex);if(matches===null){return null;}
pos+=matches[0].length;return matches[0];};}
function i(){var result=_i_();if(result===null){debug(' -- failed i',parseInt(number,10));return result;}
result=parseInt(number,10);debug(' -- passed i ',result);return result;}
function n(){var result=_n_();if(result===null){debug(' -- failed n ',number);return result;}
result=parseFloat(number,10);debug(' -- passed n ',result);return result;}
function f(){var result=_f_();if(result===null){debug(' -- failed f ',number);return result;}
result=(number+'.').split('.')[1]||0;debug(' -- passed f ',result);return result;}
function t(){var result=_t_();if(result===null){debug(' -- failed t ',number);return result;}
result=(number+'.').split('.')[1].replace(/0$/,'')||0;debug(' -- passed t ',result);return result;}
function v(){var result=_v_();if(result===null){debug(' -- failed v ',number);return result;}
result=(number+'.').split('.')[1].length||0;debug(' -- passed v ',result);return result;}
function w(){var result=_w_();if(result===null){debug(' -- failed w ',number);return result;}
result=(number+'.').split('.')[1].replace(/0$/,'').length||0;debug(' -- passed w ',result);return result;}
operand=choice([n,i,f,t,v,w]);expression=choice([mod,operand]);function mod(){var result=sequence([operand,whitespace,choice([_mod_,_percent_]),whitespace,value]);if(result===null){debug(' -- failed mod');return null;}
debug(' -- passed '+parseInt(result[0],10)+' '+result[2]+' '+parseInt(result[4],10));return parseFloat(result[0])%parseInt(result[4],10);}
function not(){var result=sequence([whitespace,_not_]);if(result===null){debug(' -- failed not');return null;}
return result[1];}
function is(){var result=sequence([expression,whitespace,choice([_is_]),whitespace,value]);if(result!==null){debug(' -- passed is : '+result[0]+' == '+parseInt(result[4],10));return result[0]===parseInt(result[4],10);}
debug(' -- failed is');return null;}
function isnot(){var result=sequence([expression,whitespace,choice([_isnot_,_isnot_sign_]),whitespace,value]);if(result!==null){debug(' -- passed isnot: '+result[0]+' != '+parseInt(result[4],10));return result[0]!==parseInt(result[4],10);}
debug(' -- failed isnot');return null;}
function not_in(){var i,range_list,result=sequence([expression,whitespace,_isnot_sign_,whitespace,rangeList]);if(result!==null){debug(' -- passed not_in: '+result[0]+' != '+result[4]);range_list=result[4];for(i=0;i<range_list.length;i++){if(parseInt(range_list[i],10)===parseInt(result[0],10)){return false;}}
return true;}
debug(' -- failed not_in');return null;}
function rangeList(){var result=sequence([choice([range,value]),nOrMore(0,rangeTail)]),resultList=[];if(result!==null){resultList=resultList.concat(result[0]);if(result[1][0]){resultList=resultList.concat(result[1][0]);}
return resultList;}
debug(' -- failed rangeList');return null;}
function rangeTail(){var result=sequence([_comma_,rangeList]);if(result!==null){return result[1];}
debug(' -- failed rangeTail');return null;}
function range(){var i,array,left,right,result=sequence([value,_range_,value]);if(result!==null){debug(' -- passed range');array=[];left=parseInt(result[0],10);right=parseInt(result[2],10);for(i=left;i<=right;i++){array.push(i);}
return array;}
debug(' -- failed range');return null;}
function _in(){var result,range_list,i;result=sequence([expression,nOrMore(0,not),whitespace,choice([_in_,_equal_]),whitespace,rangeList]);if(result!==null){debug(' -- passed _in:'+result);range_list=result[5];for(i=0;i<range_list.length;i++){if(parseInt(range_list[i],10)===parseFloat(result[0])){return(result[1][0]!=='not');}}
return(result[1][0]==='not');}
debug(' -- failed _in ');return null;}
function within(){var range_list,result;result=sequence([expression,nOrMore(0,not),whitespace,_within_,whitespace,rangeList]);if(result!==null){debug(' -- passed within');range_list=result[5];if((result[0]>=parseInt(range_list[0],10))&&(result[0]<parseInt(range_list[range_list.length-1],10))){return(result[1][0]!=='not');}
return(result[1][0]==='not');}
debug(' -- failed within ');return null;}
relation=choice([is,not_in,isnot,_in,within]);function and(){var i,result=sequence([relation,nOrMore(0,andTail)]);if(result){if(!result[0]){return false;}
for(i=0;i<result[1].length;i++){if(!result[1][i]){return false;}}
return true;}
debug(' -- failed and');return null;}
function andTail(){var result=sequence([whitespace,_and_,whitespace,relation]);if(result!==null){debug(' -- passed andTail'+result);return result[3];}
debug(' -- failed andTail');return null;}
function orTail(){var result=sequence([whitespace,_or_,whitespace,and]);if(result!==null){debug(' -- passed orTail: '+result[3]);return result[3];}
debug(' -- failed orTail');return null;}
function condition(){var i,result=sequence([and,nOrMore(0,orTail)]);if(result){for(i=0;i<result[1].length;i++){if(result[1][i]){return true;}}
return result[0];}
return false;}
result=condition();if(result===null){throw new Error('Parse error at position '+pos.toString()+' for rule: '+rule);}
if(pos!==rule.length){debug('Warning: Rule not parsed completely. Parser stopped at '+rule.substr(0,pos)+' for rule: '+rule);}
return result;}
return pluralRuleParser;}));