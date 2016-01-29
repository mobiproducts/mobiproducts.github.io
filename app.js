//
angular.module('githubViewer', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/', {
            templateUrl: 'index.html',
            controller : 'HomeController'
            }).
            when('/:users', {
                templateUrl: 'listUsers.html',
                controller: 'ListController'
            }).
            when('/:user', {
                templateUrl: 'users.html',
                controller: 'UserController'
            }).
            othervise({
                redirecteTo: '/'
            });
    }])

    .controller('HomeController', ['$scope', function($scope) {
        //empty for now
    }])

    .controller('ListController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
        var onUsers = function (response) {
            $scope.users = response.data;
        };
        var onError = function (reason) {
            $scope.error = "Could not fetch the data";
        };

        $scope.showUsers = function () {
            $scope.user = null;
            $http.get("https://api.github.com/users")
                .then(onUsers, onError);
        }
        $scope.users = $routeParams.users;
        console.log($routeParams);
    }]);

angular.module('githubViewer', ['ngAnimate'])
    .controller('mainController', ['$scope', '$http', function ($scope, $http) {
        //search for user
        var inputUser = function (response) {
            $scope.user = response.data;
            $http.get($scope.user.repos_url)
                .then(onRepos, onError);
        };

        var onUsers = function (response) {
            $scope.users = response.data;
        };

        var onRepos = function (response) {
            $scope.repos = response.data;
        };

        var onError = function (reason) {
            $scope.error = "Could not fetch the data";
        };

        $scope.showRepos = function (person) {
            //console.log(person.login);
            //$http.get("https://api.github.com/users/" + person.login)
            //    .then(inputUser, onError);
            onSearch(person.login);
        }

        $scope.search = function (username) {
            onSearch(username)
        }

        var onSearch = function (username) {
            $http.get("https://api.github.com/users/" + username)
                .then(inputUser, onError);
            $scope.username="";
        };

        $scope.showUsers = function () {
            $scope.user = null;
            $http.get("https://api.github.com/users")
                .then(onUsers, onError);
        }
        //http.get .then promise that's it returns data in the future-it could take 1 sec to 5 minutes.
        // So the javascript continues execute line 10 until data get from the server.


        $scope.sortField = 'Id'; //default sorby Id
        $scope.reverse = true;


    }]);