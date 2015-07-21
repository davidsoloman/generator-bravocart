angular.module('myShop', ['bravocart', 'ionic', 'myShop.controllers', 'myShop.services', 'myShop.services'])

.constant('appUrl', 'http://localhost:8100/#')

.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show
    // the accessory bar above the keyboard for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // Style status bar light (white)
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,
  $httpProvider, $ionicConfigProvider,
  $bcRequestInterceptorProvider) {

  // Set API key for any HTTP requests
  $bcRequestInterceptorProvider.apiKey('<%= apiKey %>');

  // Intercept HTTP requets, adding authorization header
  $httpProvider.interceptors.push('$bcRequestInterceptor');

  // If HTTP response fails, redirect to error page
  $httpProvider.interceptors.push('$bcErrorInterceptor');

  // To access routs without hashbang, uncomment lines below
  // This works only for HTML5 apps, not for native apps
  // $locationProvider.html5Mode(true).hashPrefix('!');

  // Remove text 'Back' from Back-Button when navigating
  $ionicConfigProvider.backButton.previousTitleText(false).text('');

  // Bravocart uses AngularUI Router
  // Learn more here: https://github.com/angular-ui/ui-router
  $stateProvider
    // setup an abstract state for the tabs directive
    .state('app', {
    resolve: {
      cart: function($bcCart) {
        if ($bcCart.cart) {
          return $bcCart.cart;
        } else {
          return $bcCart.create();
        }
      }
    },
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.products', {
    url: '/',
    // Resolve resources before loading view
    resolve: {
      products: function($bcProduct) {
        return $bcProduct.fetch();
      }
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/products.html',
        controller: 'ProductsCtrl',
      }
    }
  })
  .state('app.product', {
    url: '/products/:productId',
    resolve: {
      product: function($bcProduct, $stateParams) {
        var productId = $stateParams.productId;
        return $bcProduct.byId(productId);
      }
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/product.html',
        controller: 'ProductCtrl',
      }
    }
  })
  .state('app.carts', {
    url: '/carts/:cartId',
    resolve: {
      cart: function($bcCart, $stateParams) {
        var cartId = $stateParams.cartId;
        return $bcCart.get(cartId);
      }
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/cart.html',
        controller: 'CartCtrl',
      }
    }
  })
  .state('app.orders', {
    url: '/orders/:orderId?token&PayerID',
    resolve: {
      order: function($bcOrder, $stateParams) {
        return $bcOrder.get($stateParams);
      }
    },
    views: {
      'menuContent': {
        templateUrl: 'templates/order.html',
        controller: 'OrderCtrl',
      }
    }
  })
  .state('app.thanks', {
    url: '/orders/:orderId/thanks',
    views: {
      'menuContent': {
        templateUrl: 'templates/thanks.html'
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
  })
  .state('app.error', {
    url: '/error?message',
    views: {
      'menuContent': {
        templateUrl: 'templates/error.html',
        controller: 'ErrorCtrl'
      }
    },
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
