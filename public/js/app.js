angular.module('flickrPickr', [
  'flickrPickr.apiService',
  'ui.bootstrap'
])
.controller('flickrPickrController', function($scope, flickrPickrService) {
    
  // Hello
  console.log('flickrPickr Initiallized :)');

  // Get images from flickr using flickrPickrService
  $scope.getImages = function(query){
     
    // Get images from service
    flickrPickrService.getImages(query)
    .then(function successCallback(response) {
      
      // Photos array instance
      // (Promise returned from service)
      $scope.photos = response;

    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      $scope.error = 'Oops, there was a problem!';
    });
  };
})

// Photo info modal controller
.controller('photoInfoModalCtrl', function ($uibModal, $log, $document) {
  
  var $ctrl = this;
  $ctrl.animationsEnabled = true;

  // Open modal
  $ctrl.open = function (photo) {
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'photoInfoModal.html',
      controller: 'photoInfoModalInstanceCtrl',
      controllerAs: '$ctrl',
      resolve: {
        photo: function () {
          return photo;
        }
      }
    });
  };

  $ctrl.toggleAnimation = function () {
    $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
  };
})

// Photo info modal (instance) controller
// $uibModalInstance represents a modal window (instance) dependency.
.controller('photoInfoModalInstanceCtrl', function ($uibModalInstance, photo, flickrPickrService) {
  var $ctrl = this;

  // Get images from service
  flickrPickrService.getInfo(photo)
  .then(function successCallback(response) {
    
    // Photos array instance
    // (Promise returned from service)
    console.log(response);
    $ctrl.photoInfo = response;

  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    $scope.error = 'Oops, there was a problem!';
  });

  $ctrl.ok = function () {
    $uibModalInstance.close($ctrl.selected.item);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});