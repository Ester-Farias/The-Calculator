import {calcular_13_salario} from 'calculator-13-salario.js'
function aplicarMascaraMoeda(input) {
  if (!input) return;

  input.addEventListener("input", function (e) {
    let valor = e.target.value;

    // Remove tudo que não for número
    valor = valor.replace(/\D/g, "");

    if (valor === "") {
      e.target.value = "";
      return;
    }

    let numero = parseInt(valor);

    numero = (numero / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    e.target.value = numero;
  });
}


function moedaParaNumero(valor) {
  if (!valor) return 0;

  return parseFloat(
    valor.replace(/\./g, "").replace(",", ".")
  ) || 0;
}