angular.module('myShop.services', [])

.filter('bcCurrency', function($bcCurrency) {
  return function(value, seperator){
    if (!seperator) {
      if ($bcCurrency === 'USD') {
        seperator = '.';
      } else if ($bcCurrency === 'EUR') {
        seperator = ',';
      }
    }
    seperator = (seperator) ? seperator : '.';
    return (value) ? parseFloat(value/100).toFixed(2).replace('.', seperator) +
      ' ' + $bcCurrency : value;
  };
})

.factory('urlInterceptor', function(apiUrl) {
  return {
    request: function(config) {
      config.url = (/\/v010\//.test(config.url)) ?
        apiUrl + config.url : config.url;
      return config;
    }
  };
})

.factory('authInterceptor', function($q, apiKey) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      config.headers.Authorization = apiKey;
      return config;
    },
  };
});
