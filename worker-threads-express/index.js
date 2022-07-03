const app = require('express')();
const { Worker } = require('node:worker_threads');

app.get('/', (req, res) => res.send('Hello, here I am!'));

app.get('/isPrime', async (req, res) => {
    const number = req.query.number;

    const startTime = new Date();

    const result = await new Promise((resolve, reject) => {
        var worker = new Worker('./isPrime.js', { workerData: { number } });
        worker
            .on('message', data => resolve(data))
            .on('error', err => reject(err));
    });

    const endTime = new Date();

    const elapsedTime = `${(endTime - startTime) / 1000} seconds`;

    res.json({
        number,
        isPrime: result,
        elapsedTime,
    });
});

app.listen(3000);
