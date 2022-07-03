const workerpool = require('workerpool');

const fibonacci = require('../functions/fibonacci.js');
const isPrime = require('../functions/isPrime.js');
const theAnswer = require('../functions/theAnswer.js');

workerpool.worker({
    fibonacci,
    isPrime,
    theAnswer,
});
