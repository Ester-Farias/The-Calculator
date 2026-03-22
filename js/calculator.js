//Navbar Scroll//

window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

//-------------------------------------------------//
//                                                 //
//             THE CALCULATER                      //
//                                                 //
//-------------------------------------------------//

function expressaoValida(expressao) {
  const regex = /^[0-9+\-*/().\s]+$/;
  return regex.test(expressao);
}

function insert(num) {
  var numero = document.getElementById("resultado").value;
  document.getElementById("resultado").value = numero + num;
}
function clean() {
  document.getElementById("resultado").value = "";
}
function back() {
  var resultado = document.getElementById("resultado").value;
  document.getElementById("resultado").value = resultado.substring(
    0,
    resultado.length - 1,
  );
}
 function calcular() {
  const resultado = document.getElementById("resultado").value;

  if (!expressaoValida(resultado)) {
    document.getElementById("resultado").value = "Expressão inválida";
    return;
  }

  try {
    document.getElementById("resultado").value =
      Function("return " + resultado)();
  } catch {
    document.getElementById("resultado").value = "Erro";
  }
}

//-------------------------------------------------//
//                                                 //
//                    FÉRIAS                       //
//                                                 //
//-------------------------------------------------//

function calcular_ferias() {
  var salario_bruto_ferias = document.getElementById(
    "salario_bruto_ferias",
  ).value;
  var meses_trabalhados_ferias = document.getElementById(
    "meses_trabalhados_ferias",
  ).value;
}
