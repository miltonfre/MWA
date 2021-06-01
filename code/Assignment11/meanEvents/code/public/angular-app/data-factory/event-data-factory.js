angular.module("meanEvents").factory("eventDataFactory", eventDataFactory);

function eventDataFactory($http) {

    return {
        getAllEvents: getAllEvents,
        getOneEvent: getOneEvent,
        addOneEvent: addOneEvent,
        deleteOneEvent: deleteOneEvent,
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
    function addOneEvent(newEvent) {
        return $http.post('/api/events', newEvent).then(complete).catch(failed);
    }

    function deleteOneEvent(id) {
        return $http.delete('/api/events/' + id).then(complete).catch(failed);
    }

    function complete(response) {
        return response.data;
    }

    function failed(error) {
        return error.status.statusText;
    }


}