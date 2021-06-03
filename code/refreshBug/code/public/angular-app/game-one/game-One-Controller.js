angular.module("meanGames").controller("gameOneController", gameOneController);

function gameOneController(gameDataFactory, $routeParams) {
    let vm = this;
    const gameId = $routeParams.id;
    gameDataFactory.getOnegame(gameId).then(function (response) {
        console.log(response);
        vm.game = response;
    })

    vm.deleteOneGame = function () {
        gameDataFactory.deleteOneGame(gameId).then(function (response) {
            console.log("game deleted", response);
        }).catch(function (er) {
            console.log(er);
        });
    }
}