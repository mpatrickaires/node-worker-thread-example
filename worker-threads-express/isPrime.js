const {
    workerData: { number },
    parentPort,
} = require('node:worker_threads');

const isPrime = number => {
    let isPrime = true;
    if (number < 2) isPrime = false;
    if (number === 2) isPrime = true;

    for (let divisor = 2; divisor < number; divisor++) {
        if (number % divisor === 0) isPrime = false;
    }

    return isPrime;
};

const result = isPrime(number);

parentPort.postMessage(result);
