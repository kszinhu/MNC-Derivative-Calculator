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