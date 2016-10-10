
var routeJ = angular.module('routeH', ['ngRoute', 'ngAnimate', 'ngStorage']);

// create the controller and inject Angular's $scope
routeJ.factory('utils00', function ($http, $localStorage, $interval) {

  var ii = 0,
  jj = 0,
  kk = 0,
  ss = "", aa = [];

    function aaTimes(nn) {
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
    }

    function getSSii(ss, ii) {
        var aa = [];
        aa = ss.split(',');
        return aa[ii];
    }

    function spliceSSii(ss, ii, val) {
        var aa = [];
        aa = ss.split(',');
        aa[ii] = String(val);
        ss = aa.join();
        return ss;
    }

    function uTotH(th, vh, rr) {
        var ii = 0;
        var jj = 0;
        var th1 = 0;
        var th2 = 0;
        var ss = "";
        var aa = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        th1 = Math.trunc(th / 18);
        th2 = th % 18;
        for (jj = 0; jj < 18; jj++) {
            aa[jj] = th1;
            if (parseInt(rr[jj]) <= th2) {
                aa[jj]++;
            }
        }
        ss = aa.join();
        return ss;
    }

    var tt = 4;
    var pp = 8;
    var ww = 10;
    var zz16A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var gscPrizes = "15,10,5,2,1";
    var pz = [];

    var team00 = {
        Nm: "TAA",
        totS: 0,
        totW: 0,
        xxP: []
    };
  var vp00 = { nm: "p00", id: "", tm: "", th: 0, ts: 0, tw: 0,
        s: "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
        h: "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
        w: "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
        u1: "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
        ld: "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
        cp: "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"
    };

    // return options
    return {
        xxTimes: function(nn) {
            return aaTimes(nn);
        },
        
        vp00: function() {
            return vp00;
        }
    };

});

// create the controller and inject Angular's $scope
routeJ.run( function ($localStorage) {
  if (angular.isUndefined($localStorage.vm)) {
    $localStorage = $localStorage.$default({mip: false});
  }
});

// create the controller and inject Angular's $scope
routeJ.controller('mainController', function ($scope, $http, $localStorage, utils00) {
  $scope.vCourses = [{
        "Nm": "Chester Wash",
        "rating": 69.5,
        "slope": 117,
        "par": [4,3,4,3,4,4,4,4,4,3,4,5,3,4,4,4,4,5],
        "hcp": [9,15,11,17,13,5,3,7,1,18,12,14,6,8,4,10,2,16]
    }];
    $http.get('courses.json').success(function (jsonData) {
        $scope.vCourses = angular.copy(jsonData);
  });
  $scope.vm00 = { when: " ", loc: " ", pp: 0, ww: 0, tt: 0, 
    cp: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], ch: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    jp: 0, pz4: [30, 15, 8, 5, 2, 1, -1, -2, -5] };
  $scope.vp00 = { nm: " ", id: "", tm: "", th: 0, ts: 0, tw: 0,
    s: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    h: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    w: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    u1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ld: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    cp: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]  };
  $scope.xxTimes = function (nn) {
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

  $scope.vpArr = [ { nm: " ", id: "", tm: "", th: 0, ts: 0, tw: 0,
    s: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    h: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    w: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    u1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ld: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    cp: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] } ];

  $scope.clearLSvp = function() {
      delete $localStorage.vp;
      $localStorage.vp = angular.copy($scope.vp00);
  };
  $scope.clearLSvm = function() {
      $localStorage.$reset();
      $scope.clearLSvp();
      $localStorage.vm = angular.copy($scope.vm00);
  };
  $scope.saveLS = function () {
      $localStorage.mip = true;
      $localStorage.vm.jp = $localStorage.vm.pp * $localStorage.vm.ww;
  };
  $scope.selCourseF = function (cc) {
    if (angular.isDefined(cc)) {
      $localStorage.vm.loc = cc.Nm;
      $localStorage.vm.cp = cc.par; 
      $localStorage.vm.ch = cc.hcp; 
      $scope.saveLS();
    }
  };
  $scope.calcPz4 = function () {
    console.log("x0131");
    for (ii = 0; ii < $localStorage.vm.pp; ii++) {
      for (jj = 0; jj < 18; jj++) {
        console.log($localStorage.vp[ii].w[jj], $localStorage.vm.pz4[jj]);
      } 
    }
    
  //  console.log(ppIdx, hhIdx);
  //  $localStorage.vp[ppIdx].w[hhIdx] = ppIdx+9;
  //  $localStorage.vp[ppIdx].w[hhIdx] = $localStorage.vm.pz4[$localStorage.vp[ppIdx].s[hhIdx]+4];
  };
  $scope.menuSel = function(mm) {
    var ii = 0;
  
    switch (mm) {
      case 'm1a':
        angular.element('#mainM01').modal({
          keyboard: false
        });
        break;
      case 'm2':
        angular.element('#mainM02').modal({
          keyboard: false
        });
        break;
      default:
        break;
    }
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
      var aa = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        
      for (jj = 0; jj < $scope.$l_s.vm.pp; jj++) {
        $scope.$l_s.vp[jj].s = aa;
        $scope.$l_s.vp[jj].h = aa;
        $scope.$l_s.vp[jj].w = aa;
        $scope.$l_s.vp[jj].u1 = aa;
        $scope.$l_s.vp[jj].ld = aa;
        $scope.$l_s.vp[jj].cp = aa; 
        $scope.$l_s.vp[jj].h = $scope.uTH($scope.$l_s.vp[jj].th, $scope.$l_s.vm.ch);
      }
      
      //  Manually hide the modal.
      angular.element('#mainM02').modal('hide');
    };

  $scope.$l_s = $localStorage;
  
  $localStorage.vm.jp = $localStorage.vm.pp * $localStorage.vm.ww;
  
});
