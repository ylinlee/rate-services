(function() {
    'use strict';

    angular
        .module('rateApp.rate-services')
        .factory('ReviewService', ReviewService);

    ReviewService.$inject = ['$http', 'RateEndPoint'];

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
