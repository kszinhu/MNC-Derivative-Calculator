/**
 * returns the formatted mathematical expression.
 *
 * @param {input} string of the unformatted mathematical expression.
 * @param {x} number of X.
 * @return {output} string of the formatted mathematical expression.
 */
function formattingExpression(input, x) {
  const output = input
    .replace("x", x)
    .replace("sen", "sin")
    .replace("tg", "tan")
    .replace("^", "**")
    .replace("pi", "Math.PI");
  return output;
}

/**
 * returns the value at the point of the derivative.
 *
 * @param {input} string of the formatted mathematical expression.
 * @param {x} number of X.
 * @param {epsilon} number of Epsilon.
 * @return {output} value at the point of the derivative.
 */
function calculateFirstDerivative(input, x, epsilon) {
  let h = 1000 * epsilon;

  with (Math)
    p =
      (eval(formattingExpression(input, x + h)) -
        eval(formattingExpression(input, x - h))) /
      (2 * h);

  for (let index = 0; index < 10; index++) {
    let q = p;
    h /= 2;

    with (Math)
      p =
        (eval(formattingExpression(input, x + h)) -
          eval(formattingExpression(input, x - h))) /
        (2 * h);
    if (Math.abs(p - q) < epsilon) break;
  }
  return p;
}

/**
 * returns the value at the point of the derivative.
 *
 * @param {input} string of the formatted mathematical expression.
 * @param {epsilon} number of Epsilon.
 * @param {x} number of X.
 * @return {output} value at the point of the derivative.
 */
function calculateSecondDerivative(input, x, epsilon) {
  let h = 1000 * epsilon;

  with (Math)
    p =
      (eval(formattingExpression(input, x + 2 * h)) -
        2 * eval(formattingExpression(input, x)) +
        eval(formattingExpression(input, x - 2 * h))) /
      (4 * h * h);

  for (let index = 0; index < 10; index++) {
    let q = p;
    h /= 2;

    with (Math)
      p =
        (eval(formattingExpression(input, x + 2 * h)) -
          2 * eval(formattingExpression(input, x)) +
          eval(formattingExpression(input, x - 2 * h))) /
        (4 * h * h);
    if (Math.abs(p - q) < epsilon) break;
  }
  return p;
}
