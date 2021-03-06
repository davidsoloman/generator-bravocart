angular.module('<%- name %>.controllers', [])

.controller('ProductsCtrl', function($scope, products, $state) {
  // Retrieve all products
  $scope.products = products;

  // Redirect to product view
  $scope.showProduct = function(_product) {
    $state.go('app.product', {productId: _product});
  };
})

.controller('ProductCtrl', function($scope, product, $bcCart, $state) {
  // Retrieve on product
  $scope.product = product;

  // Add item to cart
  $scope.addItem = function(_product, quantity) {
    $bcCart.addItem({product: _product, quantity: quantity})
      .then(function() {
      $state.go('app.carts', {cartId: $bcCart.cart._id});
    });
  };
})

.controller('AppCtrl', function($scope, cart) {
  // Make cart accessible to menu.html
  $scope.cart = cart;
})

.controller('CartCtrl', function($scope, cart, $bcOrder, $bcCart,
appUrl, $window, $ionicLoading) {
  // Hide any loading frame
  $ionicLoading.hide();

  //Assign cart to scope
  $scope.cart = cart;
  
  // Change item's quantity
  $scope.modifyQuantity = function(_item, quantity) {
    $bcCart.modifyQuantity(_item, quantity);
  };

  // Remove item from cart
  $scope.removeItem = function(_item) {
    $bcCart.removeItem(_item);
  };

  // Initialise Paypal Checkout
  $scope.doCheckout = function() {
    // Show loading modal
    $ionicLoading.show({
      template: 'Forwarding to Paypal ...'
    });

    // Create order from cart
    $bcOrder.create($bcCart.cart._id)
      .then(function() {
        $bcOrder.order.paymentMethod = 'paypal-express';
        return $bcOrder.update();
      })
      .then(function(order) {
        // Return to /orders after Paypal
        var returnUrl = appUrl + '/orders/' + order._id;
        var cancelUrl = appUrl;
        return $bcOrder.pay({
          returnUrl: returnUrl,
          cancelUrl: appUrl
        });
      })
      .then(function(res) {
        // Redirect user to Paypal
        $window.location.href = res.redirectUrl;

        // Alternative for native apps only:
        // Send users to mobile browser
        // Requires cordova-plugin-inappbrowser
        //
        // window.open(res.redirectUrl, '_system');
        // $state.go('app.products');
        // $ionicLoading.hide();
      })
      .catch(function(err) {
        // Hide modal view in case of error
        $ionicLoading.hide();
      });
  };
})

.controller('OrderCtrl', function($ionicLoading, $scope,
order, $bcOrder, $state, $stateParams) {
  // Hide any loading frame
  $ionicLoading.hide();

  // Assign order to scope
  $scope.order = order;

  // Update order details
  $scope.updateOrder = function() {
    // Show loading modal
    $ionicLoading.show({
      template: 'Doing checkout ...'
    });
    $bcOrder.update()
      .then(function() {
        // Initialise checkout
        return $bcOrder.pay($stateParams);
      })
      .then(function() {
        // Redirect to Thanks page
        $ionicLoading.hide();
        $state.go('app.thanks');
      });
  };
})

.controller('ErrorCtrl', function($scope, $stateParams, $ionicLoading) {
  // Load error message from params
  $scope.message = $stateParams.message;

  // Hide any loading frame
  $ionicLoading.hide();
});
