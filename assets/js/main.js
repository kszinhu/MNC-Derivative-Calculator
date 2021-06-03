const derivedFirst = document.querySelector(".derived-first");
const derivedSecond = document.querySelector(".derived-second");

function derivative() {
  const inF = document.querySelector("#Function").value;
  const inX = document.querySelector("#valueX").value;
  const inE = document.querySelector("#epsilon").value;

  let h = 1000 * inE;
  var p = calculate(inF.replace('x',inX)); 
  
}
