angular.module('App')

.controller('SettingsController', ['$scope', 'Settings', 'Locations', function($scope, Settings, Locations) {
    var sc = this;
    
    sc.settings = Settings;
    sc.locations = Locations.data;
    sc.canDelete = false;
    
    sc.remove = function(index) {
        Locations.toggle(Locations.data[index]);
    };
    
    sc.move = function(locations, fromIndex, toIndex){
        sc.locations.splice(fromIndex, 1);
        sc.locations.splice(toIndex, 0, location);
    };
}]);