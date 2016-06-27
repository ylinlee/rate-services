(function() {
    'use strict';

    angular
        .module('rateApp.rate-services')
        .factory('PeopleService', PeopleService);

    PeopleService.$inject = ['$http', 'RateEndPoint'];

    function PeopleService($http, RateEndPointProvider) {

        var endPoint = RateEndPointProvider.endPoint;

        var path = endPoint.HOST + (endPoint.PORT !== '' ? ':' : '') + endPoint.PORT + endPoint.PEOPLE_API;
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
