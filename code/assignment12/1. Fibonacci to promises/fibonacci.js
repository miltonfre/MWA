function fibonacci(num) {
    if (num <= 2) {
        return 1;
    }
    else {
        return fibonacci(num - 1) + fibonacci(num - 2);
    }
}
function calcFibonacci(num){
    console.log("fibonacci of "+num +" is " + fibonacci(num));
}
function fibonacciError(num) {
    console.log("Error calculating fibonacci serie for number: "+ num);
}
const myFibPromise = (num) => {    
    return new Promise((resolve, reject) => {
        if (num >0) {
            resolve(num);
        }
        else{
            reject(num);
        }
    })
};
let promise=myFibPromise("hola");
promise.then(calcFibonacci).catch(fibonacciError);
promise=myFibPromise(-5);
promise.then(calcFibonacci).catch(fibonacciError);
promise=myFibPromise(9);
promise.then(calcFibonacci).catch(fibonacciError);
promise=myFibPromise(6);
promise.then(calcFibonacci).catch(fibonacciError);
