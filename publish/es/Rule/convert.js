import { isObject } from '../utils/is';
import { curry } from '../utils/func';
var quoteReg = /("(?:[^"\\]|\\.)*")|('(?:[^'\\]|\\.)*')/g;
var emptyFuncReg = /([\w|\d$]+)\s*\(\s*\)/;
var funcReg = /([\w|\d$]+)\s*\((.+)\)/;
var numberReg = /^-?(\d*\.)?\d+(e[-+]?\d+)?$/i;
var strArgReg = /\[(\d+)\]/;

function getSingleRule(str, ss) {
  var firstQuote = str.indexOf('(');
  if (firstQuote < 0) return [str.trim()];
  var match = emptyFuncReg.exec(str);
  if (match) return [match[1]];
  match = funcReg.exec(str);
  if (!match) throw new Error("\"" + str + "\" is not a valid rule.");
  var rule = [];
  rule.push(match[1]);
  match[2].split(',').forEach(function (arg) {
    arg = arg.trim();

    if (numberReg.test(arg)) {
      rule.push(parseFloat(arg));
      return;
    }

    var m = strArgReg.exec(arg);
    if (!m) throw new Error("Rule argument expect a number or a string. Do you missing the quotes of \"" + arg + "\"?");
    rule.push(ss[m[1]]);
  });
  return rule;
}

export function splitRule(str) {
  var matchs = str.match(quoteReg) || [];
  var arr = [];
  var newString = str;
  matchs.forEach(function (m, i) {
    arr.push(m.substring(1, m.length - 1).replace(/\\"/g, '"').replace(/\\'/g, "'"));
    newString = newString.replace(m, "[" + i + "]");
  });
  var rules = [];
  newString.split(';').forEach(function (s) {
    if (s) rules.push(getSingleRule(s, arr));
  });
  return rules;
}
export var convertRule = curry(function (rule, arr) {
  var method = arr[0],
      args = arr.slice(1);
  if (!rule[method]) throw new Error("Method \"" + method + "\" is not existed.");
  return rule[method].apply(rule, args);
});
export default function (rule, str) {
  if (!isObject(rule) || !str) {
    console.error(new Error('Convert arguments expect an Rule object and a string.'));
    return [];
  }

  try {
    var convert = convertRule(rule);
    return splitRule(str).map(convert);
  } catch (e) {
    throw new Error("Conver string \"" + str + "\" to rules failed. " + e.message);
  }
}