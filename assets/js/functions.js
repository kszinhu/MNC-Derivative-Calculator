/**
 * returns the value of the mathematical expression.
 *
 * @param {input} string of mathematical expression.
 * @return {output} expression value.
 */

function calculate(input) {
  var f = {
    add: "+",
    sub: "-",
    div: "/",
    mlt: "*",
    mod: "%",
    exp: "^",
  };

  // Create array for Order of Operation and precedence
  f.ooo = [
    [[f.mlt], [f.div], [f.mod], [f.exp]],
    [[f.add], [f.sub]],
  ];

  input = input.replace(/[^0-9%^*\/()\-+.]/g, ""); // clean up unnecessary characters

  var output;
  for (var i = 0, n = f.ooo.length; i < n; i++) {
    // Regular Expression to look for operators between floating numbers or integers
    var reg = new RegExp(
      "(\\d+\\.?\\d*)([\\" + f.ooo[i].join("\\") + "])(\\d+\\.?\\d*)"
    );
    reg.lastIndex = 0; // take precautions and reset reg starting pos

    // Loop while there is still calculation for level of precedence
    while (reg.test(input)) {
      output = _calculate(RegExp.$1, RegExp.$2, RegExp.$3);
      if (isNaN(output) || !isFinite(output)) return output; // come out if not a number
      input = input.replace(reg, output);
    }
  }

  return output;

  function _calculate(a, op, b) {
    a = a * 1;
    b = b * 1;
    switch (op) {
      case f.add:
        return a + b;
        break;
      case f.sub:
        return a - b;
        break;
      case f.div:
        return a / b;
        break;
      case f.mlt:
        return a * b;
        break;
      case f.mod:
        return a % b;
        break;
      case f.exp:
        return Math.pow(a, b);
        break;
      default:
        null;
    }
  }
}
