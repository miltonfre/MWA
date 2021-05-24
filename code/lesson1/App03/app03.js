const applyDiscount=function(discount){
    console.log("2: in discount"+discount);
}
const inTimeout=function(){
    console.log("2: in timeout");
}
console.log("1:Start app");

//setTimeout(()=>applyDiscount(30),3000);
setTimeout(inTimeout,3000);
setTimeout(applyDiscount.bind(this,40),3000);


console.log("3:end app");