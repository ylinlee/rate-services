(function() {
    'use strict';

    angular.module('rateApp.rate-services-constants', [])

.constant('API_END_POINT', {
	'HOST': 'http://localhost',
	'PORT': '3001',
	'PEOPLE_API': '/apiPeople/',
	'REVIEWS_API': '/apiReviews/'
})

;
})();