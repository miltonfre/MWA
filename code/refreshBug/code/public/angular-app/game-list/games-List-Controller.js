angular.module("meanGames").controller("gamesController", gamesController);

function gamesController(gameDataFactory,$window) {
    let vm = this;
    vm.title = "MEAN games app";
    gameDataFactory.getAllgames().then(function (response) {
        vm.games = response;
    });
    vm.addGame = function () {
        const newGame = {
            title: vm.newGameTitle,
            price: vm.newGamePrice,
            designers: vm.newGameYear,
            players: vm.newGameTitle,
            rate: vm.newGameRating,
            publisher: vm.newGameMinPlayers
        }

        gameDataFactory.addOneGame(newGame).then(function (response) {
            console.log("game created", response);
        }).catch(function (er) {
            console.log(er);
        });
    }
    vm.isLoggedIn = function () {
        console.log("isLoggedIn");
        if ($window.sessionStorage.isLoggedIn) { return true; }
        else { return false; }
    };
}