const workerpool = require('workerpool');

class SuperComputer {
    CALCULATION_SECONDS = 2;

    theAnswer() {
        console.log(
            'Hold on! I am doing some super complex calculations to get the answer.'
        );

        // Even if we use the dedicated workers, only a static function can be used at the original function.
        const result = SuperComputer.someSuperComplexCalculation();

        return result;
    }

    static someSuperComplexCalculation() {
        const calculationTime =
            // In this case, if we use a property that is owned by the object itself, it will be returned as
            // undefined
            // new Date().getTime() + this.CALCULATION_SECONDS * 1000;
            new Date().getTime() + 2 * 1000;
        while (new Date().getTime() <= calculationTime) {}

        return 42;
    }
}

const superComputer = new SuperComputer();

workerpool.worker({ theAnswer: superComputer.theAnswer });

module.exports = superComputer.theAnswer;
