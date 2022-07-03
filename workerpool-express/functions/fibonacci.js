const ZERO = 0;

function fibonacci(position) {
    // If a external variable (of the surrounding scope) is used inside the function, the workerpool will
    // throw an exception.
    // This, however, doesn't seem to be a problem if we use a dedicated worker.
    if (position < 1) return ZERO;
    if (position === 1) return 1;
    return fibonacci(position - 1) + fibonacci(position - 2);
}

module.exports = fibonacci;
