import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { describe, it } from 'mocha';
import { initSaga } from '../src/sagas';

describe("hello world", function() {
    it("log hello world", function() {
        const initState = {"hi" : "hi"};
        const finalState = initState;

        return expectSaga(initSaga/*, ...sagaParams*/)
            // Assert that the `call` will eventually happen.
            .call(console.log, "hello world !")

            // Dispatch any actions that the saga will `take`.
            .dispatch({ type: 'USELESS_TEST', payload: 42 })

            //lets start the saga with this state
            .withState(initState)

            //we except this test when the saga is completed
            .hasFinalState(initState)

            // Start the test. Returns a Promise.
            .run();
    });
});