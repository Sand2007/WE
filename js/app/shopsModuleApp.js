angular.module('shopsModuleApp', [])
.controller('shopsCtrl', function ($scope, $http) {
    $scope.loadPlace = function () {
        //Получаем список топовых магазинов и переформотирываем его под массив массивы по 4 магазина
        $http.get("../../data/shopsPageData/topshops.json").success(function (response) {
                var b = [];
                var newArr = [];                
                for (i = 0; i < response.length; i = i + 4) {                    
                        for (j = i; j < i + 4; j++) {
                            b.push(response[j]);                           
                        }
                        newArr.push(b);
                        b = [];
                    }  
            $scope.regionShops = newArr;
        });
        // Получаем саисок областей для выпадающего списка
        $http.get("../../data/shopsPageData/region.json").success(function (response) {
            // при успешной обработке запроса передаем данные в scope
            $scope.places = response;
        });
        $scope.dataRegionHref = "../../data/shopsPageData/topshops.json";
    }();
    //ВЫПАДАЮЩИЙ СПИСОК
    var countClickInput = 0; //Устанавливает счетчик кликов по полю ввода области в ноль
    $scope.textInput = "Область"; //выводит надпись выберите область в поле для ввода        
    $scope.styleArrow = 'url("/images/arrowDown.png")'; //при загрузке страницы стрелочка возле инпута смотрит вниз
    $scope.clickInput = function () { // после клика на поле ввода выводит список областей
        countClickInput = countClickInput + 1;
        if ($scope.places.length < 9) {     //Если количество областей меньше 9 то они выводятся в одну колонку
            $scope.optionRegion = "optionRegion8";
            $scope.optionsRegion = "optionsRegion8";
        };
        //если клик четный то стрелочка смотрит вниз и наоборот, если не четный то вверх
        if (countClickInput % 2 != 0) {
            $scope.showList = true;
            $scope.styleArrow = 'url("images/arrowUp.png")';
        }
        else {
            $scope.showList = false;
            $scope.styleArrow = 'url("/images/arrowDown.png")';
        };
    }
    $scope.listMouseEnter = function (placeEvent) { //При наведении на область, ее название выводится в поле для ввода
        $scope.textInput = placeEvent.region;
    }
    //ПОЛЕ МАГАЗИНОВ    
    $scope.shopTileClick = function (shopObject, indexShopTile) {
        $scope.indexShopTile = indexShopTile;
        $scope.shopObject = shopObject;
        $scope.whiteBox = "whiteBox" + indexShopTile;
    }
    $scope.shopTileLineClick = function (indexShopTileLine) {
        $scope.indexShopTileLine = indexShopTileLine;
    }
    //при клике на пункте выпадающего списка отсылаем запрос на сервер и получаем места зимнего отдыха по области на которую кликнули
    $scope.listClick = function (place) {
        $http.get(place.href).success(function (response) {
            var b = [];
            var newArr = [];
            for (i = 0; i < response.length; i = i + 4) {
                for (j = i; j < i + 4; j++) {
                    b.push(response[j]);                    
                }
                newArr.push(b);
                b = [];
            }           
            $scope.regionShops = newArr;   
            $scope.showList = false;                        //скрываем список областей
            $scope.textInput = regionPlaces.region;         //в поле ввода выводим название области по которой кликнули в списке
        });       
        countClickInput = countClickInput + 1;              //увеличиваем счетчик клика на один
        $scope.styleArrow = 'url("/images/arrowDown.png")'; //меняем расположение стрелочки в инпуте на расположение вниз
        $scope.indexShopTileLine = 10;
    }
});