angular.module('videoModuleApp', [])
.controller('videoCtrl', function ($scope, $http, $sce) {
    var mainVideoId, intermediateVideoId, intermediateVideoDescription;
    $scope.loadVideo = function () {
        //Получаем список видео, которые вставим в сайт
        $http.get("../../data/videoPageData/video.json").success(function (response) {
            

            mainVideoId = response[0].id;
            $scope.mainVideo = $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + mainVideoId);
            $scope.mainVideoDescription = response[0].videoDescription;
            response.splice(0, 1);
            $scope.videos = response;
            }
            
       
    )
    }();

    $scope.clickSecondVideo = function (video, index) {
        intermediateVideoId = video.id;
        $scope.mainVideo = $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + video.id);        
        $scope.videos[index].id = mainVideoId;
        mainVideoId = intermediateVideoId;

        intermediateVideoDescription = $scope.mainVideoDescription // передаем в переменную описание главного ролика
        
        $scope.mainVideoDescription = video.videoDescription;
        $scope.videos[index].videoDescription = intermediateVideoDescription;
    }

        
});