
angular.module( 'app.search', [

    ])
    .factory('SearchService',['$http', '$q', function($http, $q){
        return {
            parseSearchResult : function(searchText, limit){
                console.log('someone called me!');
                var deferred = $q.defer();
                $http.jsonp('//itunes.apple.com/search?term=' + encodeURIComponent(searchText) + '&limit=' + limit + '&callback=JSON_CALLBACK').then(function (resp) {
                    deferred.resolve(resp.data);
                });
                return deferred.promise;
            }
        }
    }]);