function normalize (number, digits) {
  var number = number.toString(),
    lessDigits = digits  - number.length;

  while(lessDigits--) {
    number = "0" + number;
  }

  return number;
}

function objToArray (obj) {
  var result = [];
  for(var i in obj){
    result.push(obj[i]);
  }
  return result;
}

function trim (number) {
  var number = number.toString();

  return number.replace(/^0+/, '');
}

module.exports = {

  add: function () {
    var numbers = objToArray(arguments),
      numNumbers = numbers.length,
      result = "";

    while (numNumbers--) {
      result = this._addTwoNumbers(result, numbers[numNumbers]);
    }

    return result;
  },

  _addTwoNumbers: function (operand1, operand2) {
    var operand1 = operand1.toString(),
      operand2 = operand2.toString(),
      maxDigits = Math.max(operand1.length, operand2.length),
      operand1 = normalize(operand1, maxDigits),
      operand2 = normalize(operand2, maxDigits),
      operand1Digits = operand1.split(""),
      operand2Digits = operand2.split(""),
      curDigit = maxDigits,
      remainder = 0,
      result = "";

    while(curDigit--) {
      var a = operand1Digits[curDigit],
        b = operand2Digits[curDigit],
        intA = parseInt(a, 10),
        intB = parseInt(b, 10),
        sum = intA + intB + remainder;

      remainder = (sum > 9) ? 1 : 0;
      result = (sum % 10).toString() + result;

      if(curDigit === 0) result = remainder.toString() + result;
    }

    return trim(result);
  },

  max: function () {
    var numbers =  objToArray (arguments),
      numNumbers = numbers.length,
      largest = "";

    for(var i = 0; i < numNumbers; i++) {
      var number = numbers[i],
        largest = this._maxTwoNumbers(largest, number);
    }

    return largest;
  },

  _maxTwoNumbers: function (operand1, operand2) {
    var operand1 = operand1.toString(),
      operand2 = operand2.toString(),
      maxDigits = Math.max(operand1.length, operand2.length),
      operand1 = normalize(operand1, maxDigits),
      operand2 = normalize(operand2, maxDigits)
      operand1Digits = operand1.split(""),
      operand2Digits = operand2.split("");

    for(var i = 0; i < maxDigits; i++) {
      var operand1Digit = parseInt(operand1Digits[i], 10),
        operand2Digit = parseInt(operand2Digits[i], 10);

      if (operand1Digit > operand2Digit) {
        return operand1;
      } else if (operand2Digit > operand1Digit) {
        return operand2;
      } else if ((i === (maxDigits - 1)) && (operand1Digit === operand2Digit)){
        return operand2;
      }
    }
  },

  min: function () {
    var numbers =  objToArray (arguments),
      numNumbers = numbers.length,
      smallest = numbers[0];

    for(var i = 0; i < numNumbers; i++) {
      var number = numbers[i],
        smallest = this._minTwoNumbers(smallest, number);
    }

    return smallest;
  },

  _minTwoNumbers: function (operand1, operand2) {
    var operand1 = operand1.toString(),
      operand2 = operand2.toString(),
      maxDigits = Math.max(operand1.length, operand2.length),
      operand1 = normalize(operand1, maxDigits),
      operand2 = normalize(operand2, maxDigits)
      operand1Digits = operand1.split(""),
      operand2Digits = operand2.split("");

    for(var i = 0; i < maxDigits; i++) {
      var operand1Digit = parseInt(operand1Digits[i], 10),
        operand2Digit = parseInt(operand2Digits[i], 10);

      if (operand1Digit < operand2Digit) {
        return operand1;
      } else if (operand2Digit < operand1Digit) {
        return operand2;
      } else if ((i === maxDigits - 1) && (operand1Digit === operand2Digit)) {
        return operand1;
      }
    }
  },

  pow: function (base, power) {
    var base = base.toString(),
      power = parseInt(power, 10),
      result = "1";

    if (power === 0) {
      return result;
    } else if (power === 1) {
      return base;
    } else if (base === "10") {
      for (var i = 0; i < power; i++) {
        result+= "0";
      }
    } else {
      for (var i = 0; i < power; i++) {
        result = this.multiply(result, base);
      }
    }

    return result;
  },

  multiply: function () {
    var numbers = objToArray (arguments),
      numNumbers = numbers.length,
      result = numbers[0];

    for (var i = 1; i < numNumbers; i++) {
      var number = numbers[i],
        result = this._multiplyTwoNumbers(result, number);
    }

    return result;
  },

  _multiplyTwoNumbers: function (operand1, operand2) {
    if(parseInt(operand1, 10) === 0 || parseInt(operand2, 10) === 0) return 0;

    var operand1 = operand1.toString(),
      operand2 = operand2.toString(),
      maxDigits = Math.max(operand1.length, operand2.length),
      operand1 = normalize(operand1, maxDigits),
      operand2 = normalize(operand2, maxDigits),
      operand1Digits = operand1.split(""),
      operand2Digits = operand2.split(""),
      parts = [];

    var trailingZeros1 = "";
    for (var a = 0; a < maxDigits; a++) {
      var place1 = maxDigits - 1 - a,
        trailingZeros2 = "";

      for (var b = 0; b < maxDigits; b++) {
        var place2 = maxDigits - 1 - b,
          lead = (parseInt(operand1Digits[place1], 10) * parseInt(operand2Digits[place2], 10)).toString();

        parts.push(lead + trailingZeros1 + trailingZeros2);

        trailingZeros2 += "0";
      }

      trailingZeros1 += "0";
    }

    return this.add.apply(this, parts);
  }

}