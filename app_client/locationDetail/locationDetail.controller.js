(function () {
    angular
        .module('loc8rApp')
        .controller('locationDetailCtrl', locationDetailCtrl);

    locationDetailCtrl.$inject = ['$routeParams', 'loc8rData'];
    function locationDetailCtrl($routeParams, loc8rData) {
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
    }
})();