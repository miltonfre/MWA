angular.module("meanGames").controller("gamesController", gamesController);

function gamesController(gameDataFactory) {
    let vm = this;
    vm.title = "MEAN games app";
    console.log("gamesController");
    gameDataFactory.getAllgames().then(function (response) {
        vm.games = response;
    });
}