angular.module("meanLaureates").factory("laureateDataFactory", laureateDataFactory);

function laureateDataFactory($http) {

    return {
        getAllLaureates: getAllLaureates,
        getOneLaureate: getOneLaureate,
        addOneLaureate: addOneLaureate,
        deleteOneLaureate: deleteOneLaureate,
        updateOneLaureate:updateOneLaureate,
        getLaureatesByCountryBirth:getLaureatesByCountryBirth,
    }
    
    function getLaureatesByCountryBirth(offSet,count,search) {
        let vm = this;
        vm.title = "MEAN laureates app";
        return $http.get('/api/laureates/search?search='+search+'&offset='+offSet+'&count='+count).then(complete).catch(failed);
    }

    function getAllLaureates(offSet,count) {
        let vm = this;
        vm.title = "MEAN laureates app";
        return $http.get('/api/laureates?offset='+offSet+'&count='+count).then(complete).catch(failed);
    }

    function getOneLaureate(id) {
        let vm = this;
        return $http.get('/api/laureates/' + id).then(complete).catch(failed);
    }
    function addOneLaureate(newlaureate) {
        return $http.post('/api/laureates', newlaureate).then(complete).catch(failed);
    }

    function deleteOneLaureate(id) {
        return $http.delete('/api/laureates/' + id).then(complete).catch(failed);
    }

    function updateOneLaureate(id,laureate) {
        return $http.put('/api/laureates/' + id,laureate).then(complete).catch(failed);
    }

    function complete(response) {
        return response.data;
    }

    function failed(error) {
        return error.status.statusText;
    }


}