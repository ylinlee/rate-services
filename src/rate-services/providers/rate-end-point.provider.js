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
