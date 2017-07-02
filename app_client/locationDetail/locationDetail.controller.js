(function () {
    angular
        .module('loc8rApp')
        .controller('locationDetailCtrl', locationDetailCtrl);

    locationDetailCtrl.$inject = ['$routeParams', '$modal', 'loc8rData'];
    function locationDetailCtrl($routeParams, $modal, loc8rData) {
        var vm = this;
        vm.locationid = $routeParams.locationid;

        loc8rData.locationById(vm.locationid)
            .then(function(success) {
                vm.data = { location: success.data };
                vm.pageHeader = {
                    title : vm.data.location.name
                };
            },
            function(error) {
                console.log(error);
            });

            vm.popupReviewForm = function () {
                var modalInstance = $modal.open({
                    templateUrl: '/reviewModal/reviewModal.view.html',
                    controller: 'reviewModalCtrl as vm',
                    resolve : {
                        locationData : function () {
                            return {
                                locationid : vm.locationid,
                                locationName : vm.data.location.name
                            };
                        }
                    }
                });
            };
    }

})();