const app = require('express')();
const workerpool = require('workerpool');
const fibonacci = require('./functions/fibonacci.js');
const isPrime = require('./functions/isPrime.js');
const theAnswer = require('./functions/theAnswer.js');

// All the functions (fibonacci, isPrime, theAnswer) were made using something of the surrounding scope
// (an external variable or function). So, for the workerpool's workers to be able to work with that, it is
// necessary to create the pool using dedicated workers like in the following way, with all those functions
// that use something that is outside of them.
// The reason for this to happen is because the functions passed dinamically to the pool are stringfied and
// apparently executed using eval.
const pool = workerpool.pool(`${__dirname}/workers/index.js`, {
    workerType: 'thread',
});

app.get('/', (req, res) => {
    res.send('I am not blocked now!');
});

app.get('/fibonacci', async (req, res) => {
    const position = req.query.position;

    const startTime = new Date();
    const number = await pool.exec('fibonacci', [position]);
    const endTime = new Date();

    const elapsedTime = `${(endTime - startTime) / 1000} seconds`;

    res.json({
        position,
        number,
        elapsedTime,
    });
});

app.get('/is-prime', async (req, res) => {
    const number = req.query.number;

    const startTime = new Date();
    const result = await pool.exec('isPrime', [number]);
    const endTime = new Date();

    const elapsedTime = `${(endTime - startTime) / 1000} seconds`;

    res.json({
        number,
        isPrime: result,
        elapsedTime,
    });
});

app.get('/the-answer', async (req, res) => {
    const startTime = new Date();
    const result = await pool.exec('theAnswer');
    const endTime = new Date();

    const elapsedTime = `${(endTime - startTime) / 1000} seconds`;

    res.json({
        theAnswer: result,
        elapsedTime,
    });
});

app.get('/workers', (req, res) => {
    res.send(pool.stats());
});

app.listen(3001);
