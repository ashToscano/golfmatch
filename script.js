
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
  //  https://gwfl.github.io/gsc/courses.json
  $http.get('courses.json').success(function (jsonData) {
   $rootScope.vCourses = angular.copy(jsonData);
  });
  $rootScope.vm00 = { when: " ", loc: " ", pp: 0, ww: 0, tt: 0, 
    cp: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], ch: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    jp: 0, pz4: [30, 15, 8, 5, 2, 0, -2, -4, -6, -8], mip: false };
  $rootScope.vp00 = { nm: " ", id: "", tm: "", th: 0, ts: 0, tw: 0,
    wolf: [ { role: "", pts: 0, winner: false } ], 
    s: [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    h: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    w: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    u1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    u2: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]  };
  $rootScope.ww00 = [ { role: "hh", hunted: false, } ];   // hh=3; ww=2; lw=4; bw=3x; pg=2x
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
    $localStorage.vm.loc = $scope.selCC.Nm.substring(0,15);
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
       if ($localStorage.vp[ii].s[jj] !== null) {
        s = $localStorage.vp[ii].s[jj] - $localStorage.vp[ii].h[jj];
        pz4 = $localStorage.vm.pz4[s +4];
        $localStorage.vp[ii].w[jj] = pz4;
        $localStorage.vp[ii].tw += pz4 + $localStorage.vp[ii].u2[jj];
        $localStorage.vp[ii].ts += $localStorage.vp[ii].s[jj] + $localStorage.vm.cp[jj];
       } }
      $localStorage.vm.jp -= $localStorage.vp[ii].tw;
    }  // .\ nested for loops
    $localStorage.vm.mip = true;
  };
  $scope.adjVP = function (kk, ppIdx, hhIdx, ss) {  
    switch (ss) {
      case 's':
        $localStorage.vp[ppIdx].s[hhIdx] = $localStorage.vp[ppIdx].s[hhIdx] + kk;
        break;
      case 'u':
        $localStorage.vp[ppIdx].u2[hhIdx] = $localStorage.vp[ppIdx].u2[hhIdx] + kk;
        break;
      default:
        break;
    }
    $scope.calcTsw();
  };

  $scope.wolfPts = function (role, winner, hhIdx, ppIdx) {  

      //  2 wolves win 2 points each
      //  hunters win 3 points each
      //  lone wolf wins 4 points
      //  Blind Wolf: Triple Points for everyone
      //  Pig:  Double Points for everyone

    switch (role) {
      case 'ww':    //  ww, hh, lw, bw, pg
      //  2 wolves win 2 points each
        break;
      default:
        break;
    }
    $scope.calcTsw();
  };

  if (angular.isDefined($localStorage.vm) && !$localStorage.vm.mip) { 
    console.log("vm.pp * .ww:", $localStorage.vm.pp, $localStorage.vm.ww);
    $localStorage.vm.jp = $localStorage.vm.pp * $localStorage.vm.ww;
  }
  $scope.$l_s = $localStorage;
  
});
