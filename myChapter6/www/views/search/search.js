angular.module('App')

.controller('SearchController', ['$scope', '$http', function($scope, $http) {
    var sc = this;
    
    sc.model = {term: ''};
    
    sc.search = function () {
        $http.get('https://maps.googleapis.com/maps/api/geocode/json', {params: {address: sc.model.term}}).success(function (response) {
            sc.results = response.results;
        });
    };
}]);