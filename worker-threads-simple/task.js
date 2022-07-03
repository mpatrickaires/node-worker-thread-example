const { threadId, parentPort } = require('node:worker_threads');

const workerId = threadId;

const COUNTER_LIMIT = 200000;

for (let counter = 0; counter < COUNTER_LIMIT; counter++) {
    parentPort.postMessage({ id: workerId, counter });
}
