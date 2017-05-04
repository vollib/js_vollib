(function() {
  var Constants;

  Constants = (function() {
    function Constants() {}

    Constants.FLOAT_MAX = Number.MAX_VALUE;

    Constants.MINUS_FLOAT_MAX = -Constants.FLOAT_MAX;

    return Constants;

  })();

  js_vollib.helpers.constants = Constants;

}).call(this);
