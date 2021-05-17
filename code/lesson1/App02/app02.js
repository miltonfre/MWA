const talk=require("./talk");
const question=require("./talk/question.js");

const answer= question.ask("Milton");
answer();
talk.greeting();
talk.intro();