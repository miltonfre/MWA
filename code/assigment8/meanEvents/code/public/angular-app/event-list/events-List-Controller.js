angular.module("meanEvents").controller("eventsController", eventsController);

function eventsController(eventDataFactory) {
    let vm = this;
    vm.title = "MEAN Events app";
    console.log("eventsController");
    eventDataFactory.getAllEvents().then(function (response) {
        vm.events = response;
    });
}