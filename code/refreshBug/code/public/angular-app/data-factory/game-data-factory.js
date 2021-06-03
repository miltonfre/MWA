angular.module("meanGames").factory("gameDataFactory", gameDataFactory);

function gameDataFactory($http) {

    return {
        getAllgames: getAllgames,
        getOnegame: getOnegame,
        addOneGame:addOneGame,
        deleteOneGame:deleteOneGame
    }

    function getAllgames() {
        let vm = this;
        vm.title = "MEAN Games app";
        return $http.get('/api/games').then(complete).catch(failed);
    }

    function getOnegame(id) {
        let vm = this;
       return $http.get('/api/games/' + id).then(complete).catch(failed);
    }

    function addOneGame(newGame) {
       return $http.post('/api/games',newGame).then(complete).catch(failed);
    }

    function deleteOneGame(id) {
        return $http.delete('/api/games/' + id).then(complete).catch(failed);
    }

    function complete(response) {
        return response.data;
    }

    function failed(error) {
        return error.status.statusText;
    }


}