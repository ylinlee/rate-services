(function(){
  'use strict';

  angular
    .module('rateApp.rate-services')
    .provider('RateEndPoint', RateEndPointProvider);
    

    function RateEndPointProvider() {

      var vm = this;
      vm.$get = RateEndPointHelper;
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

      function RateEndPointHelper() {
        return {
          endPoint: _endPoint
        };
      }
    }

})();
