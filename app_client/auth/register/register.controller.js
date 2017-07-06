(function () {
    angular
        .module('loc8rApp')
        .controller('registerCtrl', registerCtrl);

    registerCtrl.$inject = ['$location', 'authentication'];
    function registerCtrl($location, authentication) {
        var vm = this;

        vm.pageHeader = {
            title: "Create a new Loc8r account"
        };

        vm.credentials = {
            name : "",
            email : "",
            password : ""
        };

        vm.returnPage = $location.search().page || '/';

        vm.onSubmit = function () {
            vm.formError = "";
            var errorSpace = "";
            if (!vm.credentials.name || !vm.credentials.email || !vm.credentials.password) {
                if (!vm.credentials.name) {
                    vm.formError = "Name is required.";
                    errorSpace = " ";
                }
                if (!vm.credentials.email) {
                    vm.formError += errorSpace + "Email is required.";
                    errorSpace = " " ;
                }
                if (!vm.credentials.password) {
                    vm.formError += errorSpace + "Password is required";
                }
                return false;
            } else {
                vm.doRegister();
            }
        };

        vm.doRegister = function() {
            vm.formError = "";

            authentication
                .register(vm.credentials)
                .then(function(success) {
                    $location.search('page',null);
                    $location.path(vm.returnPage);
                },
                function(error) {
                    vm.formError = error;
                });
        };
    }
})();