angular.module('App')
.controller('ExchangesController', function ($scope, $http, $state, $stateParams, Currencies) {


  $scope.currencies = Currencies;
  
  $scope.currency = $stateParams.currency || 'USD';

  $http.get('https://api.bitcoinaverage.com/exchanges/' + $scope.currency)
       .success(function (exchanges) {
           
           $scope.exchanges = exchanges;

  });
  
  console.log("We are in the Exchanges Controller");

});