angular.module("meanEvents").factory("eventDataFactory", eventDataFactory);

function eventDataFactory($http) {

    return {
        getAllEvents: getAllEvents,
        getOneEvent: getOneEvent,
    }

    function getAllEvents() {
        let vm = this;
        vm.title = "MEAN Events app";
        return $http.get('/api/events').then(complete).catch(failed);
    }

    function getOneEvent(id) {
        let vm = this;
       return $http.get('/api/events/' + id).then(complete).catch(failed);
    }

    function complete(response) {
        return response.data;
    }

    function failed(error) {
        return error.status.statusText;
    }


}