/*
LazyCarousel Controller
author: Renato Longobardi
*/


angular.module('placesModuleApp')

	
	.controller('lazyCarouselController',['$scope','itemService', function($scope, itemService){

				$scope.currentSlide = 1;
				$scope.stopLazy = false;

				//alert($scope.source);
				var a = $scope.source;
				a = a.slice(-2, -1);
                
				$scope.source = $scope.source.slice(0, -3);

				itemService.get($scope.source).then(
					//success
					function (response) {

					    
					    
					    //alert(response);
					    $scope.items = response.data[a].img;
					    $scope.limit = response.data[a].img.length;
                        

						
					 //error
					},function(){

						alert('problem to loading contents! try later! :(')
					}
				)
	}])