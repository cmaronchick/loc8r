(function () {
    angular
        .module('loc8rApp')
        .controller('reviewModalCtrl', reviewModalCtrl);

    reviewModalCtrl.$inject = ['$modalInstance', 'loc8rData', 'locationData'];
    function reviewModalCtrl ($modalInstance, loc8rData, locationData) {
        var vm = this;
        vm.locationData = locationData;

        vm.modal = {
            cancel : function () {
                $modalInstance.dismiss('cancel');
            }
        }

        vm.onSubmit = function () {
            console.log(vm.formData);
            vm.formError = "";
            var errorSpace = "";
            if (!vm.formData.name || !vm.formData.rating || vm.formData.review) {
                if (!vm.formData.name) {
                    vm.formError += "Name is required.";
                    errorSpace = " ";
                }
                if (!vm.formData.rating) {
                    vm.formError += errorSpace + "Rating is required.";
                    errorSpace = " ";
                }
                if (!vm.formData.review) {
                    vm.formError += errorSpace + "Review is required.";
                }
                console.log(vm.formError)
                return false;
            } else {
                console.log(vm.formData);
                return false;
            }
        }
    }
})();