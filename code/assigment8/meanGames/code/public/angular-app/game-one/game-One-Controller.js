angular.module("meanGames").controller("gameOneController",gameOneController);

function gameOneController(gameDataFactory,$routeParams){
    let vm=this;
    const gameId=$routeParams.id;
    gameDataFactory.getOnegame(gameId).then(function(response){
        console.log(response);
        vm.game=response;
    })
}