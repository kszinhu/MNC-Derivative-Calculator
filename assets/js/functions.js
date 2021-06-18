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
    .replace(/\^/gi, "**")
    .replace(/pi/gi, "Math.PI")
    .replace(/\e/gi, "Math.e");
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

function calculatePartialDerivative(input, i, epsilon) {
  let x = getValueX();
  let h = 1000 * epsilon;
  let xi = x[i];
  x[i] = xi + h;

  f1 = evaluate(input, getObjectVariables(input, x));
  x[i] = xi - h;
  f2 = evaluate(input, getObjectVariables(input, x));
  p = (f1 - f2) / (2 * h);

  for (let index = 0; index < 10; index++) {
    q = p;
    h = h / 2;
    x[i] = xi + h;
    f1 = evaluate(
      formattingExpression(input),
      getObjectVariables(input, x)
    ).toPrecision(12);
    x[i] = xi - h;
    f2 = evaluate(
      formattingExpression(input),
      getObjectVariables(input, x)
    ).toPrecision(12);
    p = parseFloat((f1 - f2) / (2 * h)).toPrecision(12);
    if (Math.abs(p - q) < epsilon) break;
  }
  return p;
}

// Support functions

evaluate = (input, variables) => {
  with (variables) with (Math) return eval(input);
};

getSize = (input) => input.match(/\b([a-df-z])\d*\b/gi).length;

getValueX = () =>
  Array.from(document.querySelectorAll(".xValues")).map((element) =>
    parseFloat(element.innerHTML)
  );

getObjectVariables = (input, x_values) =>
  input
    .match(/\b([a-df-z])\d*\b/gi)
    .reduce(
      (acc, cur, index) => ((acc[cur] = parseFloat(x_values[index])), acc),
      {}
    );

blurCollapse = (input) => {
  if (!isNaN(parseFloat(input.value))) {
    let newElement = document.createElement("span");
    newElement.innerHTML = input.value;
    newElement.setAttribute(`data-x`, input.value);
    newElement.setAttribute("class", "xValues");
    input.parentNode.replaceChild(newElement, input);
  }
};

createResult = (size, element_class, result) => {
  let element = document.querySelector(element_class);
  for (let index = 0; index < size; index++) {
    let newElement = document.createElement("tr");
    newElement.innerHTML = `<span style="font-weight: normal; padding: 5px; margin-bottom: 10px;">${result[index]}</span>`;
    element.appendChild(newElement);
  }
};

createInput = (size, element_class, orientation) => {
  let element = document.querySelector(element_class);
  for (let index = 0; index < size; index++) {
    let newElement = document.createElement(orientation);
    newElement.innerHTML = `<input class="table-input" type="number" onblur="blurCollapse(this)"></input>`;
    element.appendChild(newElement);
  }
};

createLabels = (size, element_class, counter = 1, orientation) => {
  let element = document.querySelector(element_class);
  for (let index = 0; index < size; index++) {
    let newElement = document.createElement(orientation);
    //newElement.setAttribute("style", "display: flex; margin-bottom: 10px; padding: 5px;");
    newElement.innerHTML = `${counter}`;
    element.appendChild(newElement);
    counter++;
  }
};
