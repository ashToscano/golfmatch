
var routeJ = angular.module('routeH', ['ngRoute', 'ngAnimate', 'ngStorage']);

// create the controller and inject Angular's $scope
routeJ.run( function ($rootScope, $localStorage, $http) {
  var ii = 0;  var jj = 0;

  // global variables  $rootScope
  $rootScope.vCourses = [{
        "Nm": "Chester Wash",
        "rating": 69.5,
        "slope": 117,
        "par": [4,3,4,3,4,4,4,4,4,3,4,5,3,4,4,4,4,5],
        "hcp": [9,15,11,17,13,5,3,7,1,18,12,14,6,8,4,10,2,16]
  }];
  $http.get('https://gwfl.github.io/gsc/courses.json').success(function (jsonData) {
   $rootScope.vCourses = angular.copy(jsonData);
  });
  $rootScope.vm00 = { when: " ", loc: " ", pp: 0, ww: 0, tt: 0, 
    cp: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], ch: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    jp: 0, pz4: [30, 15, 8, 5, 2, 0, -2, -4, -6, -8], mip: false };
  $rootScope.vp00 = { nm: " ", id: "", tm: "", th: 0, ts: 0, tw: 0,
    s: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    h: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    w: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    u1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    u2: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]  };
  $rootScope.xxTimes = function (nn) {
   var ii = 0;
   var aa = [];
   for (ii = 0; ii < nn; ii++) {
     if (arguments.length > 1) {
       aa[ii] = arguments[1];
     } else {
      aa[ii] = ii;
     }
   }
    return aa;
  };
  $rootScope.clearLSvp = function() {
    delete $localStorage.vp;
    $localStorage.vp = [];  $localStorage.vp.length = 20;

    for (ii = 0; ii < 20; ii++) {
      $localStorage.vp[ii] = angular.copy($rootScope.vp00);
    }
  };
  $rootScope.clearLSvm = function() {
    $localStorage.$reset();
    if (angular.isUndefined($localStorage.vm)) {
      $localStorage.vm = angular.copy($rootScope.vm00);
    }  
    $rootScope.clearLSvp();
  };  
  $rootScope.menuSel = function(mm) {
    var ii = 0;
  
    switch (mm) {
      case 'm1a':
        angular.element('#mainM01').modal({
          keyboard: false
        });
        break;
      case 'm2':
        $scope.clearLSvp();
        angular.element('#mainM02').modal({
          keyboard: false
        });
        break;
      default:
        break;
    }
  };

  if (angular.isUndefined($localStorage.vm)) {
    $rootScope.clearLSvm();
  }
  
});

// create the controller and inject Angular's $scope
routeJ.controller('mainController', function ($scope, $http, $localStorage) {

  $scope.selCourseF = function () {
    $localStorage.vm.loc = $scope.selCC.Nm;
    $localStorage.vm.cp = $scope.selCC.par; 
    $localStorage.vm.ch = $scope.selCC.hcp; 
    $localStorage.vm.jp = $localStorage.vm.pp * $localStorage.vm.ww;
  };
  $scope.uTH = function(th, rr) {
    var jj = 0;
    var th1 = 0;
    var th2 = 0;
    var aa = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    th1 = Math.trunc(th / 18);
    th2 = th % 18;
    for (jj = 0; jj < 18; jj++) {
      aa[jj] = th1;
      if (parseInt(rr[jj]) <= th2) {
        aa[jj]++;
      }
    }
    return aa;
  };
  $scope.vp18 = function(ii) {
    for (jj = 0; jj < $scope.$l_s.vm.pp; jj++) {
      $scope.$l_s.vp[jj].h = $scope.uTH($scope.$l_s.vp[jj].th, $scope.$l_s.vm.ch);
    }
  };

  $scope.calcTsw = function () {  
    var pz4 = 0; var s = 0;
    $localStorage.vm.jp = $localStorage.vm.pp * $localStorage.vm.ww;
    for (ii = 0; ii < $localStorage.vm.pp; ii++) {
      $localStorage.vp[ii].ts = 0;
      $localStorage.vp[ii].tw = 0;
      for (jj = 0; jj < 18; jj++) {
        pz4 = $localStorage.vm.pz4[$localStorage.vp[ii].s[jj] +4];
        s = $localStorage.vp[ii].s[jj];
        $localStorage.vp[ii].w[jj] = pz4;
        $localStorage.vp[ii].tw += pz4 + $localStorage.vp[ii].u2[jj];
        $localStorage.vp[ii].ts += s + $localStorage.vm.cp[jj];
      }
      $localStorage.vm.jp -= $localStorage.vp[ii].tw;
    }  // .\ nested for loops
    $localStorage.vm.mip = true;
  };
  $scope.adjVPs = function (kk, ppIdx, hhIdx) {  
    $localStorage.vp[ppIdx].s[hhIdx] = $localStorage.vp[ppIdx].s[hhIdx] + kk;
    $scope.calcTsw();
  };
  $scope.adjVPu2 = function (kk, ppIdx, hhIdx) {  
    $localStorage.vp[ppIdx].u2[hhIdx] = $localStorage.vp[ppIdx].u2[hhIdx] + kk;
    $scope.calcTsw();
  };

  if (angular.isDefined($localStorage.vm) && !$localStorage.vm.mip) { 
    console.log("vm.pp * .ww:", $localStorage.vm.pp, $localStorage.vm.ww);
    $localStorage.vm.jp = $localStorage.vm.pp * $localStorage.vm.ww;
  }
  $scope.$l_s = $localStorage;
  
});
