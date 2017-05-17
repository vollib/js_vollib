
function assertEquals(actual, expected, delta, message) {
    message = message || "";
    message = message.concat("Expected: ".concat(expected, "\ Actual: ", actual));
    if (isNaN(actual) && isNaN(expected)) {
        QUnit.assert.ok(true, message);
    } else {
        if (typeof delta === 'undefined') {
            delta = 0;
        }
        message = message.concat("\ Diff: ", Math.abs(actual - expected));
        QUnit.assert.ok(Math.abs(actual - expected) <= delta, message);
    }
}

function assertImpliedVolatilityPUTValue(actual_iv, sigma_input, min_value, delta) {
    var message = "Expected values: ".concat(sigma_input, " or ", min_value, "\ Actual: ", actual_iv);
    QUnit.assert.ok((Math.abs(actual_iv-sigma_input) <= delta) || actual_iv == min_value, message);
}

function linspace(start, end, size) {
    var step = (end-start)/(size-1);
    var result_array = [];
    result_array[0] = start;
    for (i = 1; i < size-1; i++) {
        result_array[i] = result_array[i-1] + step;
    }
    result_array[size-1] = end;
    return result_array;
}
