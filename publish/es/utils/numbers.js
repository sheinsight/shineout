export function range(end, start) {
  if (start === void 0) {
    start = 0;
  }

  var delta = end - start;

  if (typeof delta !== 'number' || Number.isNaN(delta)) {
    console.error(new Error('end can not computed with start'));
  }

  return Array.from({
    length: end - start
  }, function (v, k) {
    return k + start;
  });
}
export function split(total, nums) {
  if (typeof total !== 'number' || total === 0) {
    console.error(new Error('total mast be a number(not equal 0)'));
  }

  var remain = 1;
  var nilCount = 0;
  var ratios = nums.map(function (n) {
    if (n) {
      var r = n / total;
      remain -= n;
      return r;
    }

    nilCount += 1;
    return null;
  });
  return ratios.map(function (r) {
    if (!r) r = remain / nilCount;
    return total * r;
  });
}
export function toPrecision(num, precision) {
  if (precision === void 0) {
    precision = 12;
  }

  return +parseFloat(num.toPrecision(precision));
}
export function validateNumber(num) {
  if (typeof num === 'number') {
    return !Number.isNaN(num);
  } // Empty


  if (!num) {
    return false;
  }

  return (// Normal type: 11.28
    /^\s*-?\d+(\.\d+)?\s*$/.test(num) || // Pre-number: 1.
    /^\s*-?\d+\.\s*$/.test(num) || // Post-number: .1
    /^\s*-?\.\d+\s*$/.test(num)
  );
}
export function isE(number) {
  var str = String(number);
  return !Number.isNaN(Number(str)) && str.includes('e');
}
export function getNumberPrecision(number) {
  var numStr = String(number);

  if (isE(number)) {
    var precision = Number(numStr.slice(numStr.indexOf('e-') + 2));
    var decimalMatch = numStr.match(/\.(\d+)/);

    if (decimalMatch && decimalMatch[1]) {
      precision += decimalMatch[1].length;
    }

    return precision;
  }

  return numStr.includes('.') && validateNumber(numStr) ? numStr.length - numStr.indexOf('.') - 1 : 0;
}
export function sub(num1, num2) {
  var number = Number(num1) + Number(num2);
  if (Number.isNaN(number)) return NaN;

  if (number > Number.MAX_SAFE_INTEGER) {
    return Number.MAX_SAFE_INTEGER;
  }

  if (number < Number.MIN_SAFE_INTEGER) {
    return Number.MIN_SAFE_INTEGER;
  }

  var maxPrediction = Math.max(getNumberPrecision(num1), getNumberPrecision(num2));
  return Number(number.toFixed(maxPrediction));
}