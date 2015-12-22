//Модуль и контроллер на Главную страницу сайта
angular.module('mainModuleApp', [])
.controller('mainCtrl', function ($scope, $http) {
    
    $scope.getnewsblog = function () {
        // $http.get - выполняем http get запрос к указанному ресурсу.
        $http.get("../../data/mainPageData/newsBlog.json").success(function (response) {
            // при успешной обработке запроса передаем данные в scope
            $scope.newsblog = response;
        });

        $http.get("../../data/mainPageData/events.json").success(function (response) {
            // Преобразование массива объектов в 2 массив двух массивов
            var a = new Array;
            var b = new Array;            for (i = 0; i < 2; i++) {
                a.push(response[i]);
            }            for (j = 2; j < 4; j++) {
                b.push(response[j]);
            }            $scope.events = [a, b];
        });

        $http.get("../../data/mainPageData/friends.json").success(function (response) {
            $scope.friends = response;
        });

    }();        
});