var videoModuleApp = angular.module('videoModuleApp', [])

.controller('videoCtrl', function ($scope, $http, $sce) {
    var mainVideoId, intermediateVideoId, intermediateVideoDescription;
    $scope.loadVideo = function () {
        //Получаем список видео, которые вставим в сайт
        $http.get("../../data/videoPageData/video.json").success(function (response) {
            

            mainVideoId = response[0].id; //В переменную mainVideoId записываем нулевое по порядку значение id который пришел в json файле
            $scope.mainVideo = $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + mainVideoId); // Записываем в $scope.mainVideo адресс ссылки на youtube главного видео
            $scope.mainVideoDescription = response[0].videoDescription;// Записываем в $scope.mainVideoDescription описание главного видео
            response.splice(0, 1); //Удаляем из ответа пришедшего с сервера первый элемент(главное видео)
            $scope.videos = response; // Записываем в $scope.videos ответ от сервера без первого видео(главного видео)
            }
            
       
    )
    }();

    $scope.clickSecondVideo = function (video, index) {
        intermediateVideoId = video.id; // в переменную intermediateVideoId записываем id видео по которому кликнули
        $scope.mainVideo = $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + video.id); // в $scope.mainVideo (главное видео) заносим видео, по которому кликнули       
        $scope.videos[index + $scope.currentPage * $scope.pageSize].id = mainVideoId; // В массиве меняем всех видео меняем видео по которому кликнули на id главного видео | $scope.currentPage * $scope.pageSize к индексу добавляем размерность видео в данном случае 5
        mainVideoId = intermediateVideoId; // в переменную mainVideoId  записываем записываем из буфера id по которому кликнули

        intermediateVideoDescription = $scope.mainVideoDescription // передаем в переменную описание главного ролика
        
        $scope.mainVideoDescription = video.videoDescription;
        $scope.videos[index + $scope.currentPage * $scope.pageSize].videoDescription = intermediateVideoDescription;
    }




    $scope.currentPage = 0; // Устанавливаем начальную страницу
    $scope.pageSize = 5; // Устанавливаем количество видео, которое будет отображаться на экране
    
    $scope.numberOfPages = function () {
        return Math.ceil($scope.videos.length / $scope.pageSize);
    }
   

        
});

videoModuleApp.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});