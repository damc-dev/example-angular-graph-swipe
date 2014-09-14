var myApp = angular.module('website', ['ngAnimate', 'ngTouch', 'tc.chartjs']);

myApp.factory("profileService", function($rootScope) {
  var service = {};
  service.profile = {};

  service.prepForBroadcast = function(profile) {
    this.profile = profile;
    this.broadcastItem();
  };
  service.broadcastItem = function() {
    $rootScope.$broadcast('handleBroadcast');
  };
  
  return service;
              
});

//myApp.controller('MainCtrl', function($scope, profileService) {
MainCtrl = function($scope, profileService) {
  $scope.cost =200;
  $scope.direction = 'left';
  $scope.currentIndex = 0;
  $scope.profiles = [
      {
      category: 'Groceries',
      cost: 700,
      savings: 120
      },
      {
      category: 'Home',
      cost: 1500,
      savings: 400
      },
      {
      category: 'Auto',
      cost: 2400,
      savings: 300
      }
  ];
  
  console.log("initial broadcast");
  profileService.prepForBroadcast($scope.profiles[$scope.currentIndex]);
  
  $scope.isCurrentSlideIndex = function (index) {
    return $scope.currentIndex === index;
  };
  $scope.prevSlide = function () {
    $scope.direction = 'left';
    $scope.currentIndex = ($scope.currentIndex < $scope.profiles.length - 1) ? ++$scope.currentIndex : 0;
    profileService.prepForBroadcast($scope.profiles[$scope.currentIndex]);
  };

  $scope.nextSlide = function () {
      $scope.direction = 'right';
      $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.profiles.length - 1;
      profileService.prepForBroadcast($scope.profiles[$scope.currentIndex]);
  };

};  
//});

//myApp.controller('DoughnutCtrl', function ($scope, profileService) {
DoughnutCtrl = function ($scope, profileService) {
/*
$scope.data = [
    { value : 50, color : "#F7464A" },
    { value : 90, color : "#E2EAE9" },
    { value : 75, color : "#D4CCC5" },
    { value : 30, color : "#949FB1"}
  ];
 */ 
  
  $scope.data = [];
  $scope.options =  {
    segmentShowStroke : true,
    segmentStrokeColor : "#fff",
    segmentStrokeWidth : 24,
    percentageInnerCutout : 50,
    animation : true,
    animationSteps : 100,
    animationEasing : "easeOutBounce",
    animateRotate : true,
    animateScale : false,
    onAnimationComplete : null
  };
    
  $scope.updateProfile = function( profile) {
    $scope.data = [ 
      { value: profile.cost,  color : "#F7464A" },
      { value: profile.savings, color: "#E2EAE9" }
    ];
    console.log(profile); 
  };
  
  $scope.$on('handleBroadcast', function() {
    $scope.updateProfile(profileService.profile);
  });
};
//});



DoughnutCtrl.$inject = ['$scope', 'profileService'];
MainCtrl.$inject = ['$scope', 'profileService'];
