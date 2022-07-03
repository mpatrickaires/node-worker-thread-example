const { Worker, isMainThread, parentPort } = require('node:worker_threads');

if (isMainThread) {
    var worker = new Worker(__filename);

    worker
        .on('online', () =>
            console.log(`[Worker online event] - Worker started!`)
        )
        .on('message', data => console.log(`[Worker message event] - ${data}`))
        .on('error', data => console.log(`[Worker error event] - ${data}`))
        .on('exit', data =>
            console.log(`[Worker exit event] - Exit code: ${data}`)
        );
} else {
    parentPort.postMessage("It's me, the Worker!");

    const didErrorOcurred = Math.floor(Math.random() * 2) === 1;

    if (didErrorOcurred) throw new Error('Oops, some error occured...');
}
