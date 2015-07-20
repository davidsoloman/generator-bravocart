angular.module('myShop', ['bravocart', 'ionic', 'myShop.controllers', 'myShop.services', 'myShop.services'])

.constant('apiUrl', 'https://api.bravocart.io')
.constant('appUrl', 'http://localhost:3000')
.constant('apiKey', '<%= apiKey %>')
.constant('$bcCurrency', '<%= currency %>')

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,
  $httpProvider, $locationProvider) {

  // Bravocart, likewise Ionic, uses AngularUI Router
  // Learn more here: https://github.com/angular-ui/ui-router
  $httpProvider.interceptors.push('authInterceptor');
  $httpProvider.interceptors.push('urlInterceptor');

  // To access routs without hashbang, uncomment lines below
  // This works only for HTML5 apps, not for native apps
  // $locationProvider.html5Mode(true).hashPrefix('!');

  $stateProvider
    // setup an abstract state for the tabs directive
    .state('app', {
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.products', {
    url: '/',
    views: {
      'menuContent': {
        templateUrl: 'templates/products.html',
        controller: 'ProductsCtrl',
      }
    }
  })
  .state('app.product', {
    url: '/products/:productId',
    views: {
      'menuContent': {
        templateUrl: 'templates/product.html',
        controller: 'ProductCtrl',
      }
    }
  })
  .state('app.carts', {
    url: '/carts/:cartId',
    views: {
      'menuContent': {
        templateUrl: 'templates/cart.html',
        controller: 'CartCtrl',
      }
    }
  })
  .state('app.orders', {
    url: '/orders/:orderId?token&PayerID',
    views: {
      'menuContent': {
        resolve: {
          order: function($bcOrder, $stateParams) {
            return $bcOrder.get($stateParams);
          }
        },
        templateUrl: 'templates/order.html',
        controller: 'OrderCtrl',
      }
    }
  })
  .state('app.thanks', {
    url: '/orders/:orderId/thanks',
    views: {
      'menuContent': {
        templateUrl: 'templates/thanks.html',
        controller: 'OrderCtrl',
      }
    }
  })
  .state('app.imprint', {
    url: '/imprint',
    views: {
      'menuContent': {
        templateUrl: 'templates/imprint.html',
      }
    }
  })
  .state('app.help', {
    url: '/help',
    views: {
      'menuContent': {
        templateUrl: 'templates/help.html',
      }
    }
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
