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
