const hello=function(name){
    console.log("this is hello function in index for "+name);
}

const intro=function(){
console.log("this is intro message in index");
}

module.exports={
    hello:hello,
    intro:intro
}