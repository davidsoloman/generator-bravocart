angular.module('<%- name %>.services', [])

.filter('bcCurrency', function() {
  var converter = function(number, currency, separator) {
    if (!number) {
      return number;
    }
    currency = (currency) ? currency : '$';
    separator = (separator) ? separator : '.';
    if (currency === '$') {
      return currency + parseFloat(number/100).toFixed(2).replace('.', separator);
    } else {
      return parseFloat(number/100).toFixed(2).replace('.', separator) + ' ' + currency;
    }
  };
  return converter;
});

