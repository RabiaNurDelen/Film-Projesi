﻿var app = angular.module("movies", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "main.html",
        controller: "filmListeleCtrl"
    })
    .when("/detail/:movieid", {
        templateUrl: "detail.html",
        controller: "filmIzleCtrl"
    })
    .when("/login", {
        templateUrl: "login.html",
        controller: "loginCtrl"
    })
    ;
});

app.controller("filmListeleCtrl", function ($scope, $http) {
    $scope.movies = [];
	$scope.categories = [];
	$scope.selectedCategory = 0;
	$scope.categoryTitle = "Tüm Kategoriler";
	
	
	$scope.changeCategory  = function (category) {		
		if(category != undefined) {
			$scope.selectedCategory = category.id;
			$scope.categoryTitle = category.name;
			getMovies(category.id);
		} else {
			$scope.selectedCategory = 0;
			$scope.categoryTitle = "Tüm Kategoriler";
			getMovies();
		}
	}

	var getCategories = function() {		
	    $http.get('http://localhost:61741/api/Category/GetAllCategories')
		.then( function(response) {			
			$scope.categories = response.data;
		});
	}
	
	var getMovies = function (categoryId) {
	    if (categoryId != undefined) {
	        url = 'http://localhost:61741/api/Movie/GetAllMoviesByCategory?CategoryID='+categoryId;
	    } else {
	        url = 'http://localhost:61741/api/Movie/GetAllMovies';
	    }
        
		$http.get(url)
		.then( function(response) {			
			$scope.movies = response.data;
		});
	}

	getCategories();
	getMovies();
});

app.controller("filmIzleCtrl", function ($scope, $http, $routeParams) {
    $scope.params = $routeParams;
    $scope.title = "";
    $scope.description = "";
    $scope.imageUrl = "";
    $scope.videoUrl = "";

    var getMovie = function () {
        $http.get('http://localhost:61741/api/Movie/GetMovie?MovieID=' + $scope.params.movieid)
		.then(function (response) {
		    $scope.title = response.data.title;
		    $scope.description = response.data.description;
		    $scope.imageUrl = response.data.imageUrl;
		    $scope.videoUrl = response.data.videoUrl;
		});
    }
    getMovie();
});

app.controller("loginCtrl", function ($scope, $http) {
    
});

// Youtube URL bilgisini güvenilir şekle sokuyor
app.filter('trusted', ['$sce', function ($sce) {
    return function (url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);


