angular.module('App')

.controller('WeatherController', ['$scope', '$http', '$stateParams', '$ionicActionSheet', '$ionicModal', '$ionicLoading', '$interval', 'Settings', 'Locations', 
    function($scope, $http, $stateParams, $ionicActionSheet, $ionicModal, $ionicLoading, $interval, Settings, Locations) {
    var wc = this;
    
    wc.params = $stateParams;
    wc.settings = Settings;
    
    
    wc.loadWeather = function() {
        $ionicLoading.show();
        
         $http.get('/api/forecast/' + $stateParams.lat + ',' + $stateParams.lng, {params: {units: Settings.units}})
         .success( function(forecast) {
            wc.forecast = forecast;
            $ionicLoading.hide();
        });    
    };
    
    var barHeight = document.getElementsByTagName('ion-header-bar')[0].clientHeight;
    
    wc.getWidth = function() {
        return window.innerWidth + 'px';
    };
    
    wc.getTotalHeight = function() {
        return parseInt(parseInt(wc.getHeight()) * 3) + 'px';
    };
    
    wc.getHeight = function() {
        return parseInt(window.innerHeight - barHeight) + 'px';
    };
    
    
    wc.showOptions = function() {
        var sheet = $ionicActionSheet.show({
            buttons: [
                {text: 'Toggle Favoirte'},
                {text: 'Set as Primary'},
                {text: 'Sunrise Sunset Chart'}
            ],
            cancelText: 'Cancel',
            buttonClicked: function(index) {
                if (index === 0) {
                    Locations.toggle($stateParams);
                }
                if (index === 1) {
                    Locations.primary($stateParams);
                }
                if (index === 2) {
                    wc.showModal();
                }
                
                return true;
            }
        });
    };
    
    wc.showModal = function() {
        if(wc.modal) {
            wc.modal.show();
        } else {
            $ionicModal.fromTemplateUrl('views/weather/modal-chart.html', {
                scope: $scope
            }). then(function (modal) {
                wc.modal = modal;
                var days = [];
                var day = Date.now();
                for (var i = 0; i < 365; i++) {
                    day += 1000 * 60 * 60 *24;
                    days.push(SunCalc.getTimes(day, wc.params.lat, wc.params.lng));
                }
                wc.chart = days;
                wc.modal.show();
            });
        }
    };
    
    wc.hideModal = function() {
        wc.modal.hide();
    };
    
    $scope.$on('$destroy', function() {
        //wc.modal.remove();
    });
    
    $interval(function(){wc.loadWeather();}, 60000);
    
    wc.loadWeather();
}]);