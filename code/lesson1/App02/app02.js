const index=require('./talk/index');
const question =require('./talk/question');
index.hello("jhon");
index.intro();

const answer=question.ask("What is the first number?");
console.log(answer);

question.secondQuestion("second question?");
