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

  // tests only
  let variables = getObjectVariables(document.querySelector("#Function").value); // return object
  createLabels(variables);
}

function insertTable() {
  let form = document.querySelector("#form");
  let card = document.createElement("div");
  let variables = getObjectVariables(
    formattingExpression(document.querySelector("#Function").value)
  ); // Objeto com as váriáveis
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
  createLabels(variables, ".row-label");
  createInput(variables, ".input-label");
}
