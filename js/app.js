angular.module('app', ['ngMaterial', 'ngMessages', 'app.search'])
    .controller('AppCtrl', function($scope, $log, $mdDialog, $mdMedia, SearchService) {

        $scope.search = { name:'Jack', tracks:4 };
        $scope.results = [];
        $scope.tabs = [];

        var selected = null;
        var previous = null;

        $scope.selectedIndex = 2;

        $scope.removeTab = function (tab) {
            var index = $scope.tabs.indexOf(tab);
            $scope.tabs.splice(index, 1);
        };

        $scope.displayTabs = function(){
            $scope.tabs = [];
            for(var i=0 ; i< $scope.results.length ; i++){
                $scope.tabs.push({
                    'artistName'   : $scope.results[i].artistName,
                    'trackName'    : $scope.results[i].trackName,
                    'artworkUrl30' : $scope.results[i].artworkUrl30
                });
            }
        };

        $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

        $scope.showAdvanced = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'search.dialog.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: useFullScreen
                })
                .then(function(answer) {
                    $scope.search.name =  answer.name;
                    $scope.search.tracks = answer.tracks;
                    console.log($scope.search.name);
                    console.log($scope.search.tracks);
                    SearchService.parseSearchResult($scope.search.name, $scope.search.tracks ).then(function(res){
                        $scope.results=res.results;
                    });
                    console.log($scope.results);
                    $scope.displayTabs();

                }, function() {
                    console.log('dialog closed');
                });
            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });

            $scope.$watch('selectedIndex', function(current, old){
                previous = selected;
                selected = $scope.tabs[current];
            });
        };
    });
function DialogController($scope, $mdDialog) {

    $scope.artist = { name: 'Jack', tracks: 4 };

    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.answer = function() {
        $mdDialog.hide($scope.artist);
    };
}