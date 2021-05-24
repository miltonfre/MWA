const answer='this is a good question';

module.exports.ask=function(question){
    console.log("question: " +question);

    return answer;
}

module.exports.secondQuestion=function(question){
    console.log(question);
}