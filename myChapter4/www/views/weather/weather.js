angular.module('App')
.filter('direction', function() {
  
  // setting directions array
  var directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];  
  
  //filter method for getting wind direction
  return function(degree) {
    if (degree > 338) {
      degree = 360 - degree;
    }
    var index = Math.floor((degree + 22) / 45);
    return directions[index];
  };
})

    // dependency injector for weather data
.controller('WeatherController', ['$scope','$ionicLoading', 'weatherService', 'localStorageService',
    function ($scope, $ionicLoading, weatherService, localStorageService) {
      
      var wc = this;
      
      var age = Date.now();
      
      var first = true;
      
      console.log(first);

      //load from local storage
      wc.latestWeather = function() {
          return localStorageService.getData();
      };
      
      //update to local storage
      wc.updateWeather = function(val) {
          return localStorageService.setData(val);
      };

      //get weather from service/local storage
      wc.getWeather = function(){
          
        //ionic's "I'm busy loading graphic"
        $ionicLoading.show();        
        
        //is weather more than 15 minutes old?      
        if(Date.now() > age + 1000 * 60 * 15 || first){
          
          //it is no longer the first time
          first = false;
          
          //get new age
          age = Date.now();
          
          //get weather service, "weather" is the json service
          weatherService.getWeather().success(function (weather) {
            
            //write weather data to local storage
            wc.updateWeather(weather);
            
            //place weather data from service into scope variable
            wc.weather = weather;
            
            console.log(wc.weather);

            //hide ionic's "I'm busy loading" graphic
            $ionicLoading.hide();
            
          }).error(function (err) {
            $ionicLoading.show({
              template: 'Could not load weather. Please try again later.',
              duration: 3000
            });
            
            //ionic's "I'm busy loading graphic"
            $ionicLoading.hide();            
          });          
          
        }else{
          // or loaded from local storage
          wc.weather = wc.latestWeather();
        }
        //ionic's "I'm busy loading graphic"
        $ionicLoading.hide();         
      };
      //get the weather
      wc.getWeather();
}]);