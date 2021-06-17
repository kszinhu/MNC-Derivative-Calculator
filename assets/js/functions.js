/**
 * returns the formatted mathematical expression.
 *
 * @param {input} string of the unformatted mathematical expression.
 * @param {x} number of X.
 * @return {output} string of the formatted mathematical expression.
 */
function formattingExpression(input) {
  const output = input
    .replace(/sen|sin/gi, "sin")
    .replace(/cos/gi, "cos")
    .replace(/tg|tan/gi, "tan")
    .replace(/\^/, "**")
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

  p =
    (evaluate(formattingExpression(input), { x: x + h }) -
      evaluate(formattingExpression(input), { x: x - h })) /
    (2 * h);

  for (let index = 0; index < 10; index++) {
    let q = p;
    h /= 2;

    p =
      (evaluate(formattingExpression(input), { x: x + h }) -
        evaluate(formattingExpression(input), { x: x - h })) /
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
      (evaluate(formattingExpression(input), { x: x + 2 * h }) -
        2 * evaluate(formattingExpression(input), { x: x }) +
        evaluate(formattingExpression(input), { x: x - 2 * h })) /
      (4 * h * h);

  for (let index = 0; index < 10; index++) {
    let q = p;
    h /= 2;

    with (Math)
      p =
        (evaluate(formattingExpression(input), { x: x + 2 * h }) -
          2 * evaluate(formattingExpression(input), { x: x }) +
          evaluate(formattingExpression(input), { x: x - 2 * h })) /
        (4 * h * h);
    if (Math.abs(p - q) < epsilon) break;
  }
  return p;
}

function calculatePartialDerivative(input, n, x, i, epsilon) {
  let h = 1000 * epsilon;
  let xi = n[i];
  n[i] = xi + h;

  f1 = evaluate(formattingExpression(input), variables);
  n[i] = xi - h;
  with (Math) f2 = eval(formattingExpression(input, x));
  p = (f1 - f2) / (2 * h);

  for (let index = 0; index < 10; index++) {
    q = p;
    h = h / 2;
    n[i] = xi + h;
    with (Math) f1 = eval(formattingExpression(input, x));
    n[i] = xi - h;
    with (Math) f2 = eval(formattingExpression(input, x));
    p = (f1 - f2) / (2 * h);
    if (Math.abs(p - q) < epsilon) break;
  }
  return p;
}

var evaluate = (input, variables) => {
  with (variables) with (Math) return eval(input);
};
