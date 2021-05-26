angular.module("meanEvents").controller("eventOneController",eventOneController);

function eventOneController(eventDataFactory,$routeParams){
    let vm=this;
    const eventId=$routeParams.id;
    eventDataFactory.getOneEvent(eventId).then(function(response){
        console.log(response);
        vm.event=response;
    })
}