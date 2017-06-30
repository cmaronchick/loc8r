(function() {
    angular
        .module('loc8rApp')
        .directive('navigationGeneric', navigationGeneric);
    function navigationGeneric () {
        return {
            restrict: 'EA',
            templateUrl: '/common/directives/navigationGeneric/navigationGeneric.template.html'
        };
    }
})();