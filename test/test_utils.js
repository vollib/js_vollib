
function assertEquals(actual, expected, delta) {
    var message = "Expected: ".concat(expected, "\ Actual: ", actual);
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

function linspace(start, end, size) {
    var step = (end-start)/(size-1);
    var result = math.range(start, end, step).toArray();
    if (result.length == size)
        return result;
    else
        return result.concat(end);
}
