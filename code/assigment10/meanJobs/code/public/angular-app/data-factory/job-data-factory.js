angular.module("meanJobs").factory("jobDataFactory", jobDataFactory);

function jobDataFactory($http) {

    return {
        getAllJobs: getAllJobs,
        getOneJob: getOneJob,
        addOneJob: addOneJob,
        deleteOneJob: deleteOneJob,
        updateOneJob:updateOneJob,
    }

    function getAllJobs(offSet,count) {
        let vm = this;
        vm.title = "MEAN jobs app";
        return $http.get('/api/jobs?offset='+offSet+'&count='+count).then(complete).catch(failed);
    }

    function getOneJob(id) {
        let vm = this;
        return $http.get('/api/jobs/' + id).then(complete).catch(failed);
    }
    function addOneJob(newjob) {
        return $http.post('/api/jobs', newjob).then(complete).catch(failed);
    }

    function deleteOneJob(id) {
        return $http.delete('/api/jobs/' + id).then(complete).catch(failed);
    }

    function updateOneJob(id,job) {
        return $http.put('/api/jobs/' + id,job).then(complete).catch(failed);
    }

    function complete(response) {
        return response.data;
    }

    function failed(error) {
        return error.status.statusText;
    }


}