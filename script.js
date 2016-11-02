angular.module('ionicApp', ['ionic', 'ngStorage'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('eventmenu', {
      url: "/event",
      abstract: true,
      templateUrl: "templates/event-menu.html"
    })
    .state('eventmenu.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
          controller: "MainCtrl"
        }
      }
    })
    .state('eventmenu.match', {
      url: "/match",
      views: {
        'menuContent' :{
          templateUrl: "templates/match.html",
          controller: "MainCtrl"
        }
      }
    })
    .state('eventmenu.players', {
      url: "/players",
      views: {
        'menuContent' :{
          templateUrl: "templates/players.html",
          controller: "MainCtrl"
        }
      }
    })
    .state('eventmenu.ALLscores', {
      url: "/ALLscores",
      views: {
        'menuContent' :{
          templateUrl: "templates/ALLscores.html",
          controller: "MainCtrl"
        }
      }
    })
    .state('eventmenu.wolf', {
      url: "/wolf",
      views: {
        'menuContent' :{
          templateUrl: "templates/wolf.html",
          controller: "MainCtrl"
        }
      }
    });
  
  $urlRouterProvider.otherwise("/event/home");
})
.run( function ($rootScope, $localStorage, $http) {
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
  $http.get('https://gwfl.github.io/gsc/courses.json').success(function (jsonData) {
   $rootScope.vCourses = angular.copy(jsonData);
  });
  $rootScope.vm00 = { when: "When", loc: "Where", pp: 0, ww: 0, tt: 0, 
    cp: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], ch: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    jp: 0, pz4: [30, 15, 8, 5, 2, 0, -2, -4, -6, -8], mip: false };
  $rootScope.vp00 = { nm: " ", id: "", tm: "", th: 0, ts: 0, tw: 0, wolfPts: 0,
    wolf: [ { role: "Hunter", pts: 0, winner: false }, { role: "Hunter", pts: 0, winner: false },
            { role: "Hunter", pts: 0, winner: false }, { role: "Hunter", pts: 0, winner: false },
            { role: "Hunter", pts: 0, winner: false }, { role: "Hunter", pts: 0, winner: false },
            { role: "Hunter", pts: 0, winner: false }, { role: "Hunter", pts: 0, winner: false },
            { role: "Hunter", pts: 0, winner: false }, { role: "Hunter", pts: 0, winner: false },
            { role: "Hunter", pts: 0, winner: false }, { role: "Hunter", pts: 0, winner: false },
            { role: "Hunter", pts: 0, winner: false }, { role: "Hunter", pts: 0, winner: false },
            { role: "Hunter", pts: 0, winner: false }, { role: "Hunter", pts: 0, winner: false },
            { role: "Hunter", pts: 0, winner: false }, { role: "Hunter", pts: 0, winner: false }
          ], 
    s: [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],
    h: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    w: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    u1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    u2: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]  };
  $rootScope.wwRR = ["Wolf", "Hunter", "Lone-W", "Blind-W", "(pig)"]; 
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
    $localStorage.vp = [];  
    $localStorage.vp.length = $localStorage.vm.pp;

    for (ii = 0; ii < $localStorage.vm.pp; ii++) {
      $localStorage.vp[ii] = angular.copy($rootScope.vp00);
    }
  };
  $rootScope.clearLSvm = function() {
    $localStorage.$reset();
    $localStorage.vm = angular.copy($rootScope.vm00);
    $rootScope.clearLSvp();
  };  

  if (angular.isUndefined($localStorage.vm)) {
    $rootScope.clearLSvm();
  }
})

.controller('MainCtrl', function($scope, $localStorage, $ionicSideMenuDelegate,
     $ionicModal, $ionicActionSheet, $ionicPopup, $timeout) {

  $scope.selCourseF = function (selCC) {
    $localStorage.vm.loc = selCC.Nm.substring(0,15);
    $localStorage.vm.cp = selCC.par; 
    $localStorage.vm.ch = selCC.hcp; 
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
    for (jj = 0; jj < $localStorage.vm.pp; jj++) {
      $localStorage.vp[jj].h = $scope.uTH($localStorage.vp[jj].th, $localStorage.vm.ch);
    }
  };
  $scope.wolfPts = function(jj) {
    var wxx = 1, ii = 0;
    for (ii = 0; ii < $localStorage.vm.pp; ii++) {
      $localStorage.vp[ii].wolf[jj].pts = 0;
      if ($localStorage.vp[ii].wolf[jj].winner) {
        switch ($localStorage.vp[ii].wolf[jj].role) {
         case 'Hunter': 
           $localStorage.vp[ii].wolf[jj].pts = 3;
           break;
         case 'Lone-W': 
           $localStorage.vp[ii].wolf[jj].pts = 4;
           break;
         default: 
           $localStorage.vp[ii].wolf[jj].pts = 2;
           break;
        }
      }
      switch ($localStorage.vp[ii].wolf[jj].role) {
       case 'Blind-W': 
        wxx = 3;
        break;
       case '(pig)': 
        wxx = 2;
        break;
       default: 
        break;
      }
    }
    for (ii = 0; ii < $localStorage.vm.pp; ii++) {
      $localStorage.vp[ii].wolf[jj].pts *= wxx;
    }
  };
  $scope.calcTsw = function () {  
    var pz4 = 0; var s = 0; var wxx = 1;
    $localStorage.vm.jp = $localStorage.vm.pp * $localStorage.vm.ww;
    for (ii = 0; ii < $localStorage.vm.pp; ii++) {
      $localStorage.vp[ii].ts = 0;
      $localStorage.vp[ii].tw = 0;
      $localStorage.vp[ii].wolfPts = 0;
      for (jj = 0; jj < 18; jj++) {
       if ($localStorage.vp[ii].s[jj] !== null) {
        s = $localStorage.vp[ii].s[jj] - $localStorage.vp[ii].h[jj];
        pz4 = $localStorage.vm.pz4[s +4];
        $localStorage.vp[ii].w[jj] = pz4;
        $localStorage.vp[ii].tw += pz4 + $localStorage.vp[ii].u2[jj];
        $localStorage.vp[ii].ts += $localStorage.vp[ii].s[jj] + $localStorage.vm.cp[jj];

        $scope.wolfPts(jj);
        $localStorage.vp[ii].wolfPts += $localStorage.vp[ii].wolf[jj].pts;
      } }
      $localStorage.vm.jp -= $localStorage.vp[ii].tw;
    }
    $localStorage.vm.mip = true;
  };
  $scope.adjVP = function (kk, ppIdx, hhIdx, ss) {  
    $localStorage.vp[ppIdx].s[hhIdx] += 0;
    switch (ss) {
      case 's':
        $localStorage.vp[ppIdx].s[hhIdx] += kk;
        break;
      case 'u':
        $localStorage.vp[ppIdx].u2[hhIdx] += kk;
        break;
      default:
        break;
    }
    $scope.calcTsw();
  };
  
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.groups = [];
  for (var i=0; i<18; i++) {
    $scope.groups[i] = {
      name: i+1,
      items: [],
      show: false
    };
    for (var j=0; j < $localStorage.vm.pp; j++) {
      $scope.groups[i].items.push(i + '-' + j);
    }
  }
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    group.show = !group.show;
  };
  $scope.isGroupShown = function(group) {
    return group.show;
  };

  $scope.showActionsheet = function() {
    $ionicActionSheet.show({
      titleText: 'ActionSheet Example',
      buttons: [
        { text: '<i class="icon ion-share"></i> Share' },
        { text: '<i class="icon ion-arrow-move"></i> Move' },
      ],
      destructiveText: 'Delete',
      cancelText: 'Cancel',
      cancel: function() {
        console.log('CANCELLED');
      },
      buttonClicked: function(index) {
        console.log('BUTTON CLICKED', index);
        return true;
      },
      destructiveButtonClicked: function() {
        console.log('DESTRUCT');
        return true;
      }
    });
  };
 
 $scope.selWR = function(wrv,ppIdx,hhIdx) {
   $localStorage.vp[ppIdx].wolf[hhIdx].role = wrv;
   $scope.myPopup.close();
 };
 // Triggered on a button click, or some other target
 $scope.wrPop = function(ppIdx,hhIdx) {

  $scope.ppIdx = ppIdx;
  $scope.hhIdx = hhIdx;
  
  $scope.adjVP(0,ppIdx,hhIdx,'s');
  
   // An elaborate, custom popup
  $scope.myPopup = $ionicPopup.show({
     templateUrl: 'wrPopup.html',
     title: 'Select Role',
     scope: $scope
   });
 };

$scope.$l_s = $localStorage;

   // A confirm dialog
   $scope.showConfirm = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Consume Ice Cream',
       template: 'Are you sure you want to eat this ice cream?'
     });
     confirmPopup.then(function(res) {
       if(res) {
         console.log('You are sure');
       } else {
         console.log('You are not sure');
       }
     });
   };

   // An alert dialog
   $scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Don\'t eat that!',
       template: 'It might taste good'
     });
     alertPopup.then(function(res) {
       console.log('Thank you for not eating my delicious ice cream cone');
     });
   };

});
