const derivedFirst = document.querySelector(".derived-first");
const derivedSecond = document.querySelector(".derived-second");

function plotDerivedValue() {
  const inF = document.querySelector("#Function").value;
  const inX = parseFloat(document.querySelector("#valueX").value);
  const inE = parseFloat(document.querySelector("#epsilon").value);

  document.querySelector(
    ".derived-first"
  ).innerHTML = `= ${calculateFirstDerivative(inF, inX, inE)}`;
  document.querySelector(
    ".derived-second"
  ).innerHTML = `= ${calculateSecondDerivative(inF, inX, inE)}`;
}

function plotGradient() {
  // const tableResult = document.querySelector('.result-x');
  const input = document.querySelector("#Function").value;
  const inE = parseFloat(document.querySelector("#epsilon-value").value);
  let result = [];
  // tests only
  let variables = getObjectVariables(formattingExpression(input), getValueX()); // return object
  let size = getSize(
    formattingExpression(document.querySelector("#Function").value)
  );
  debugger;
  for (let index = 0; index < size; index++) {
    result[index] = calculatePartialDerivative(
      formattingExpression(input),
      index,
      inE
    );
  }
  debugger;
  insertTableResult(result);
}

function insertTable() {
  let form = document.querySelector("#form");
  let card = document.createElement("div");
  let size = getSize(
    formattingExpression(document.querySelector("#Function").value)
  ); // Tamanho das variáveis
  card.setAttribute("class", "card default insert-table");
  card.innerHTML = `<span class="title">Insira os valores das variáveis</span>
    <div class="table input-x">
      <table>
        <tbody>
          <tr class="row-label">
            <th class="label">i</th>
          </tr>
          <tr class="input-label">
            <th>x[i]</th>
          </tr>
        </tbody>
      </table>
    </div>`;

  !document.querySelector(".insert-table")
    ? form.insertBefore(card, document.querySelector("#submit")) // True - Se não existir
    : form.replaceChild(card, document.querySelector(".insert-table")); // False - Se existir
  createLabels(size, ".row-label", 1, "th");
  createInput(size, ".input-label", "th");
}

function insertTableResult(result) {
  let row = document.querySelector(".row-results");
  let card = document.createElement("div");
  let size = getSize(
    formattingExpression(document.querySelector("#Function").value)
  ); // Tamanho das variáveis
  card.setAttribute("class", "card default gradient");
  card.innerHTML = `<span class="title">Gradiente</span>
    <div class="table result-gradient">
      <table>
        <tr style="display: flex">
          <th class="column-label">
          </th>
          <th class="result-label">
          </th>
        </tr>
      </table>
    </div>`;
  debugger;
  document.querySelector(".waiting-gradient")
    ? row.replaceChild(card, document.querySelector(".waiting-gradient"))
    : row.replaceChild(card, document.querySelector(".gradient"));
  createLabels(size, ".column-label", 1, "tr");
  createResult(size, ".result-label", result);
}
