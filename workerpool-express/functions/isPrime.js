const workerpool = require('workerpool');

const TWO = 2;

function isPrime(number) {
    let isPrime = true;
    // Since a workerpool's dedicated worker is being created, apparently we can use a external
    // variable (of the surrounding scope) without an error ocurring.
    if (number < TWO) isPrime = false;
    if (number === TWO) isPrime = true;

    // With the dedicated worker, we can also use outside functions.
    isPrime = calculateIsPrime(number);

    return isPrime;
}

function calculateIsPrime(number) {
    let isPrime = true;

    for (let divisor = 2; divisor < number; divisor++) {
        if (number % divisor === 0) isPrime = false;
    }

    return isPrime;
}

workerpool.worker({
    isPrime,
});

module.exports = isPrime;
