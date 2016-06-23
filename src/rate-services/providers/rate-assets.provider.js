(function(){
  'use strict';

  angular
    .module('rateApp.rate-services')
    .provider('RateAssets', RateAssetsProvider);
    

    function RateAssetsProvider() {

      var vm = this;
      vm.$get = RateAssetsHelper;
      vm.setAssets = setAssets;
      var _assets = {
          COMMON_WIDGETS: '', //'scripts/common/widgets',
          ASSETS_DATA: '',    //'/assets/data',
          ASSETS_IMG: ''      //'/assets/img'
      };

      function setAssets(assets) {
        _assets = assets;
      }

      function RateAssetsHelper() {
        return {
          assets: _assets
        };
      }
    }

})();
