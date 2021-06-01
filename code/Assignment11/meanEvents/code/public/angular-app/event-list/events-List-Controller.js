angular.module("meanEvents").controller("eventsController", eventsController);

function eventsController(eventDataFactory,AuthFactory) {
    let vm = this;
    vm.title = "MEAN Events app";
    eventDataFactory.getAllEvents().then(function (response) {
        vm.events = response;
    });


    vm.addEvent = function () {
        const newEvent = {
            title: vm.newEventTitle,
            description: vm.newEventDescription,
            urlPicture: vm.newEventUrl,
            date: vm.newEventDate
        }

        eventDataFactory.addOneEvent(newEvent).then(function (response) {
            console.log("event created", response);
        }).catch(function (er) {
            console.log(er);
        });
    }

    vm.isLoggedIn = function () {
        if (AuthFactory.isLoggedIn) { return true; }
        else { return false; }
    };
}