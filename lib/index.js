'use strict';

exports.__esModule = true;

var _graphql = require('graphql');

var _language = require('graphql/language');

var INT = _language.Kind.INT;


var MAX_INT = Number.MAX_SAFE_INTEGER;
var MIN_INT = Number.MIN_SAFE_INTEGER;

var coerceBigint = function coerceBigint(value) {
  if (value === '') {
    throw new TypeError('Bigint cannot represent non 53-bit signed integer value: (empty string)');
  }
  var num = Number(value);
  if (num > MAX_INT || num < MIN_INT) {
    throw new TypeError('Bigint cannot represent non 53-bit signed integer value: ' + String(value));
  }
  var int = Math.floor(num);
  if (int !== num) {
    throw new TypeError('Bigint cannot represent non-integer value: ' + String(value));
  }
  return int;
};

var GraphQLBigint = new _graphql.GraphQLScalarType({
  name: 'Bigint',
  description: 'The `Bigint` scalar type represents non-fractional signed whole numeric ' + 'values. Bigint can represent values between -(2^53) + 1 and 2^53 - 1. ',
  serialize: coerceBigint,
  parseValue: coerceBigint,
  parseLiteral: function parseLiteral(ast) {
    if (ast.kind === INT) {
      var num = parseInt(ast.value, 10);
      if (num <= MAX_INT && num >= MIN_INT) {
        return num;
      }
    }
    return null;
  }
});

exports.default = GraphQLBigint;
module.exports = exports['default'];