const { Worker } = require('node:worker_threads');

const embedListeners = worker => {
    worker.on('message', ({ id, counter }) => {
        if (counter >= 5000 && counter % 5000 === 0)
            console.log(`[Worker${id}] Counter: ${counter}`);
    });
};

// Both workers will run in parallel and at the same time, which means that there's indeed a new thread
// spawned for each one.
// Through the console.log at the 'worker.on' set within the embedListeners function, it is possible to
// see this parallel execution.
const worker = new Worker('./task.js');
embedListeners(worker);

const worker2 = new Worker('./task.js');
embedListeners(worker2);
