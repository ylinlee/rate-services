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
