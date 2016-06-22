(function() {
    'use strict';

    angular.module('rateApp.rate-services', [
    ]);
})();

(function(){
  'use strict';

  angular
    .module('rateApp.rate-services')
    .provider('RateAssetsProvider', RateAssetsProvider);
    

    function RateAssetsProvider() {

      var vm = this;
      vm.$get = RateAssets;
      vm.setAssets = setAssets;
      var _assets = {
          COMMON_WIDGETS: '', //'scripts/common/widgets',
          ASSETS_DATA: '',    //'/assets/data',
          ASSETS_IMG: ''      //'/assets/img'
      };

      function setAssets(assets) {
        _assets = assets;
      }

      function RateAssets() {
        return {
          assets: _assets
        };
      }
    }

})();

(function(){
  'use strict';

  angular
    .module('rateApp.rate-services')
    .provider('RateEndPointProvider', RateEndPointProvider);
    

    function RateEndPointProvider() {

      var vm = this;
      vm.$get = RateEndPoint;
      vm.setEndPoint = setEndPoint;
      var _endPoint = {
        HOST: '',       //'http://localhost'
        PORT: '',       //'3001'
        PEOPLE_API: '', //'/apiPeople/'
        REVIEWS_API: '' //'/apiReviews/'
      };

      function setEndPoint(endPoint) {
        _endPoint = endPoint;
      }

      function RateEndPoint() {
        return {
          endPoint: _endPoint
        };
      }
    }

})();

(function() {
    'use strict';

    angular
        .module('rateApp.rate-services')
        .factory('DataService', DataService);

    DataService.$inject = ['$http'];

    function DataService($http) {
        return {
            getData: getData
        };

        function getData(path) {
            return $http.get(path)
                .then(getDataComplete)
                .catch(getDataFailed);

            function getDataComplete(response) {
                return response.data;
            }

            function getDataFailed(error) {
                console.error('XHR Failed for getData.' + error.data);
            }
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('rateApp.rate-services')
        .factory('PeopleService', PeopleService);

    PeopleService.$inject = ['$http', 'RateEndPointProvider'];

    function PeopleService($http, RateEndPointProvider) {

        var endPoint = RateEndPointProvider.endPoint;

        var path = endPoint.HOST + ':' + endPoint.PORT + endPoint.PEOPLE_API;
        var peoplePath = path + 'people';
        var personPath = path + 'person/';

        var services = {};
        services.addPerson = addPerson;
        services.getPerson = getPerson;
        services.getPeople = getPeople;
        services.updatePerson = updatePerson;
        services.deletePerson = deletePerson;

        var requestData = function (url, method, data) {
            var req = {
              method: method,
              url: url
            };
            if(data){
                req .data = data;
            }
            return $http(req )
                .then(requestDataComplete)
                .catch(requestDataFailed);

            function requestDataComplete(response) {
                return response.data;
            }

            function requestDataFailed(error) {
                console.error('XHR Failed for requestData.' + error.data);
                return error.data;
            }
        };

        function addPerson(data){
            return requestData(personPath, 'POST', data);
        }

        function getPerson(id){
            return requestData(personPath + id, 'GET');
        }

        function getPeople(){
            return requestData(peoplePath, 'GET');
        }

        function updatePerson(id, data){
            return requestData(personPath + id, 'PUT', data);
        }

        function deletePerson(id){
            return requestData(personPath + id, 'DELETE');
        }

        return services;
    }
})();

(function() {
    'use strict';

    angular
        .module('rateApp.rate-services')
        .factory('ReviewService', ReviewService);

    ReviewService.$inject = ['$http', 'RateEndPointProvider'];

    function ReviewService($http, RateEndPointProvider) {

        var endPoint = RateEndPointProvider.endPoint;

        var path = endPoint.HOST + ':' + endPoint.PORT + endPoint.REVIEWS_API;
        var reviewsPath = path + 'reviews/';
        var reviewPath = path + 'review/';

        var services = {};
        services.addReview = addReview;
        services.getReview = getReview;
        services.getReviews = getReviews;
        services.updateReview = updateReview;
        services.deleteReview = deleteReview;

        var requestData = function (url, method, data) {
            var req = {
              method: method,
              url: url
            };
            if(data){
                req.data = data;
            }
            return $http(req )
                .then(requestDataComplete)
                .catch(requestDataFailed);

            function requestDataComplete(response) {
                return response.data;
            }

            function requestDataFailed(error) {
                console.error('XHR Failed for requestData.' + error.data);
                return error.data;
            }
        };

        function addReview(data){
            return requestData(reviewPath, 'POST', data);
        }

        function getReview(id){
            return requestData(reviewPath + id, 'GET');
        }

        function getReviews(userid){
            return requestData(reviewsPath + (userid ? userid : ''), 'GET');
        }

        function updateReview(id, data){
            return requestData(reviewPath + id, 'PUT', data);
        }

        function deleteReview(id){
            return requestData(reviewPath + id, 'DELETE');
        }

        return services;
    }
})();
