'use strict';
//saying we will call main container 'noterious'
angular.module('noterious', /*dependency injection*/[
  'ui.router',
  'ngAnimate',
  'firebase',
  'noterious.common'
])
  .constant('ENDPOINT_URI', 'https://noterious.firebaseio.com/')
  // block of code that gets ran before application is ran. Need routes in place before application is loaded
 .config(function ($stateProvider, $urlRouterProvider) {
    //  says if there is no match to state, redirect to default state here
    $urlRouterProvider.otherwise('/login');
     //defines state 'login', url is login,
     // template is located
     $stateProvider
      .state('login', {
        url:'/login',
        templateUrl: 'app/login/login.tmpl.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      //   create boards route
      .state('board', {
          url:'/boards',
          templateUrl: 'app/common/'
      })
    ;

    /* HINT: Add this to your boards route to force authentication
     resolve: {
       'currentUser': ['Auth', function (Auth) {
        return Auth.$requireAuth();
       }]
     }
     */
  })
  .run(function ($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      event.preventDefault();
      if (error === 'AUTH_REQUIRED') {
        $state.go('login');
      }
    });
  })
;
