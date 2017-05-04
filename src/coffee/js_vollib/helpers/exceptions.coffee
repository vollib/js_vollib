
class PriceIsAboveMaximum
  constructor: ->
    @name = @constructor.name
    @stack = (new Error).stack

  @:: = new Error
  @::constructor = @

class PriceIsBelowIntrinsic
  constructor: ->
    @name = @constructor.name
    @stack = (new Error).stack

  @:: = new Error
  @::constructor = @

js_vollib.helpers.exceptions = {}
js_vollib.helpers.exceptions.PriceIsAboveMaximum = PriceIsAboveMaximum
js_vollib.helpers.exceptions.PriceIsBelowIntrinsic = PriceIsBelowIntrinsic