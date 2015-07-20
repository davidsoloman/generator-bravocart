angular.module('myShop.controllers', [])

.controller('ProductsCtrl', function($scope, $bcProduct, $state) {
  $scope.products = [];
  $bcProduct.fetch().then(function(data) {
    $scope.products = data;
  });
  $scope.showProduct = function(_product) {
    $state.go('app.product', {productId: _product});
  };
})

.controller('ProductCtrl', function($scope, $stateParams, $bcProduct, $bcCart, $state) {
  var filterProduct = function() {
    return $bcProduct.byId($stateParams.productId);
  };
  if ($bcProduct.products)
    $scope.product = filterProduct();
  else {
    $bcProduct.fetch()
      .then(function() {
        $scope.product = filterProduct();
      });
  }
  $scope.addItem = function(_product, quantity) {
    var doAddItem = function(_product, quantity) {
      $bcCart.addItem({product: _product, quantity: quantity})
        .then(function() {
          $state.go('app.carts', {cartId: $bcCart.cart._id});
        });
    };
    if($bcCart.cart) {
      doAddItem(_product, quantity);
    } else {
      $bcCart.create()
        .then(function() {
          doAddItem(_productl, quantity);
        });
    }
  };
})

.controller('AppCtrl', function($scope, $bcCart) {
  if(!$bcCart.cart) {
    $bcCart.create();
  }
})

.controller('CartCtrl', function($scope, $bcCart, $bcOrder, $stateParams,
  $state, appUrl, $window, $ionicLoading) {
  var assign = function() {
    $scope.cart = $bcCart.cart;
  };
  if ($bcCart.cart)
    assign();
  else {
    $bcCart.get($stateParams.cartId)
      .then(function() {
        assign();
      });
  }

  $scope.modifyQuantity = function(_item, quantity) {
    $bcCart.modifyQuantity(_item, quantity)
      .then(function() {

      });
  };
  $scope.removeItem = function(_item) {
    $bcCart.removeItem(_item);
  };
  $scope.doCheckout = function() {
    $ionicLoading.show({
      template: 'Forwarding to Paypal ...'
    });
    $bcOrder.create($bcCart.cart._id)
      .then(function() {
        $bcOrder.order.paymentMethod = 'paypal-express';
        return $bcOrder.update();
      })
      .then(function(data) {
        var returnUrl = appUrl + '/orders/' + data._id;
        return $bcOrder.pay({
          returnUrl: returnUrl,
          cancelUrl: appUrl
        });
      })
      .then(function(res) {
        $window.location.href = res.data.rediretUrl;
      })
      .catch(function(err) {
        $ionicLoading.hide();
        console.log(err);
      });
  };
})

.controller('OrderCtrl', function($scope, $bcOrder, $bcCart, $stateParams, $state) {
  $scope.order = $bcOrder.order;
  $scope.updateOrder = function() {
    $bcOrder.update()
      .then(function() {
        return $bcOrder.pay($stateParams);
      })
      .then(function() {
        $state.go('app.thanks', {orderId: $bcOrder.order._id});
      });
  };
});
