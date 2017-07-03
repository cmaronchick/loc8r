(function () {
    angular
        .module('loc8rApp')
        .controller('reviewModalCtrl', reviewModalCtrl);

    reviewModalCtrl.$inject = ['$modalInstance', 'loc8rData', 'locationData'];
    function reviewModalCtrl ($modalInstance, loc8rData, locationData) {
        var vm = this;
        vm.locationData = locationData;

        vm.onSubmit = function () {
            console.log(vm);
            vm.formError = "";
            var errorSpace = "";
            if (!vm.formData) {
                vm.formError = "Please complete the review before submitting.";
                return false;
            } else if (!vm.formData.name || !vm.formData.rating || !vm.formData.reviewText) {
                if (!vm.formData.name) {
                    vm.formError += "Name is required.";
                    errorSpace = " ";
                }
                if (!vm.formData.rating) {
                    vm.formError += errorSpace + "Rating is required.";
                    errorSpace = " ";
                }
                if (!vm.formData.reviewText) {
                    vm.formError += errorSpace + "Review is required.";
                }
                console.log(vm.formError)
                return false;
            } else {
                console.log(vm.formData);
                vm.doAddReview(vm.locationData.locationid, vm.formData);
            }
        }

        vm.doAddReview = function (locationid, formData) {
            loc8rData.addReviewById(locationid, {
                author: formData.name,
                rating: formData.rating,
                reviewText: formData.reviewText
            })
            .then(function(success) {
                console.log("Success! = ",success);
                vm.modal.close(formData);
            }, function(error) {
                console.log("uh oh = ",error);
            });
            return false;
        };

        vm.modal = {
            close : function (result) {
                $modalInstance.close({
                    author: result.name,
                    rating: result.rating,
                    createdOn: new Date(),
                    reviewText: result.reviewText
                });
            },
            cancel : function () {
                $modalInstance.dismiss('cancel');
            }
        }
    }
})();