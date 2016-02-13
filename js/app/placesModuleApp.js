angular.module('placesModuleApp', [])

.controller('placesCtrl', function ($scope, $http, $rootScope) {

    //при старте странички загружаем с сервера топ 5 мест для зимнего отдыха и список регионов дальше отображаем топ 5 мест
        $scope.loadPlace = function () {
            $http.get("../../data/placesPageData/top5places.json").success(function (response) {
                // при успешной обработке запроса выдаем на страницу топ 5 мест отдыха
                //for (i = 0; i < response.length; i++) {
                //    var pCut = response[i].p;                 

                //    response[i].p = pCut.substr(0, 390) + "...";
                //}
                $scope.regionPlaces = response;
            });
            // $http.get - выполняем http get запрос к указанному ресурсу.
            $http.get("../../data/placesPageData/region.json").success(function (response) {
                // при успешной обработке запроса передаем данные в scope
                $scope.places = response;
            });
            $scope.dataRegionHref = "../../data/placesPageData/top5places.json";
        }();

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

        //при клике на пункте выпадающего списка отсылаем запрос на сервер и получаем места зимнего отдыха по области на которую кликнули
        $scope.listClick = function (place) {
            $http.get(place.href).success(function (response) {

                //for (i = 0; i < response.length; i++) {
                //    var pCut = response[i].p;                  //Получаем весь текст и обрезаем для представления 390 символов

                //    response[i].p = pCut.substr(0, 390) + "...";
                //}

                $scope.regionPlaces = response;
                
                $scope.showList = false;                        //скрываем список областей
                $scope.textInput = regionPlaces.region;         //в поле ввода выводим название области по которой кликнули в списке
                
                
            });
            $scope.dataRegionHref = place.href;             
            countClickInput = countClickInput + 1;              //увеличиваем счетчик клика на один
            $scope.styleArrow = 'url("/images/arrowDown.png")'; //меняем расположение стрелочки в инпуте на расположение вниз
            $scope.dataListPlaces = "manyPlaces";               //устанавливаем ng-swich в положение отображения списка мест области
        }

        $scope.dataListPlaces = "manyPlaces";

    //При клике на определенном месте отдыха в регионе оно раскрывется с каруселью
        $scope.clickRegionPlace = function (regionPlace, index) {
            $scope.dataListPlaces = "onePlace"; //устанавливаем ng-swich в положение отображения одного места области
            $scope.index = $scope.dataRegionHref + "[" + index + "]"; //получаем индекс пункта списка по которому кликнули, 
            //alert(regionPlace.p);                                      //добавляем его к адресу области по которой кликнули в выпадающем списке, для того чтобы потом в контроллере карусели отобразились правильно картинки, потому что не получилось передать сообщение по $broadcast
            $scope.regionPlace = regionPlace;
            
            
            
            
        }
        
});