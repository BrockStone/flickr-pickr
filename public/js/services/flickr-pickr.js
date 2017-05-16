angular.module('flickrPickr.apiService', [])
.factory('flickrPickrService', ['$http', function($http) {

	// Api Key
    var apiKey = '6a6ba21f469a12094854e28c61323b5e';

 	return {
        getImages: function(query) {

        	// Init flickr parameter variables
        	var imgsPerPage, flickrAPI;

        	// Imges to show per page
        	imgsPerPage = 50;

        	// build URL for Flickr API
        	// More info: https://www.flickr.com/services/api/explore/flickr.photos.search
		    flickrAPI = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+apiKey+'&tags='+encodeURIComponent(query)+'&per_page='+imgsPerPage+'&format=json&nojsoncallback=1';

		    // $http returns a promise, which has a then function, which also returns a promise
		    return $http.get(flickrAPI)
            .then(function(response) {

            	// photos array to return
            	var photos = response.data.photos.photo;

                //return data when promise resolved
                //that would help you to continue promise chain.
                return photos;
            });
        },

        getInfo: function(photo) {

        	// build URL for Flickr API
        	// More info: https://www.flickr.com/services/api/explore/flickr.photos.getInfo
		    var flickrInfoAPI = 'https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key='+apiKey+'&photo_id='+photo.id+'&secret='+photo.secret+'&format=json&nojsoncallback=1';

		    // $http returns a promise, which has a then function, which also returns a promise
		    return $http.get(flickrInfoAPI)
            .then(function(response) {

            	// photo info to return
            	var photoInfo = response.data.photo;

                //return data when promise resolved
                //that would help you to continue promise chain.
                return photoInfo;
            });
        }
    };
}]);
