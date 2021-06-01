angular.module("meanEvents").directive("eventsNavigation", EventsNavigation);
function EventsNavigation() {
    return {
        restrict: "E",
        templateUrl: "angular-app/navigation-directive/navigation-directive.html"
    };
}
