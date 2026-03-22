document.addEventListener("DOMContentLoaded", function () {
  function aplicarMascara(input) {
    if (!input) return;

    input.addEventListener("input", function (e) {
      let valor = e.target.value;

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

  // aplica nos dois inputs
  aplicarMascara(document.getElementById("salario_bruto"));
  aplicarMascara(document.getElementById("valor_horas_extras"));
});


function calcular_13_salario() {
  const salarioInput = document.getElementById("salario_bruto").value;

  const salarioBruto = parseFloat(
    salarioInput.replace(/\./g, "").replace(",", ".")
  );

  const meses = Number(document.getElementById("meses_trabalhados").value);
  const parcelas = document.getElementById("num_parcelas").value;
const horasExtras = parseFloat(
  document
    .getElementById("valor_horas_extras")
    .value.replace(/\./g, "")
    .replace(",", ".")
) || 0;

  if (!salarioBruto || !meses || meses < 1 || meses > 12) {
    alert("Preencha os dados corretamente!");
    return;
  }

  const decimoTerceiro = (salarioBruto / 12) * meses;
  const inss = decimoTerceiro * 0.09;

  let valorProvento = 0;
  let valorDescontos = 0;
  let valorLiquido = 0;
  let valorhorasExtras = horasExtras;

  if (parcelas === "1") {
    valorProvento = decimoTerceiro / 2;
    valorLiquido = valorProvento;
  } else if (parcelas === "2") {
    const metade = decimoTerceiro / 2;
    valorProvento = metade;
    valorDescontos = inss;
    valorLiquido = metade - inss;

    document.getElementById("resultado_aliquota_tabela").style.display =
      "block";
  } else if (parcelas === "unica") {
    valorProvento = decimoTerceiro;
    valorDescontos = inss;
    valorLiquido = decimoTerceiro - inss;

    document.getElementById("resultado_aliquota_tabela").style.display =
      "block";
  }

  document.getElementById("salario_bruto_result").innerText =
    formatar(valorProvento);
  document.getElementById("valor_final").innerText =
    formatar(valorDescontos);
  document.getElementById("total_proventos").innerText =
    formatar(valorProvento);
  document.getElementById("total_descontos").innerText =
    formatar(valorDescontos);
  document.getElementById("resultado_13_salario").innerText =
    formatar(valorLiquido);
  document.getElementById("resultado_horas_extras").innerText =
    formatar(valorhorasExtras);

  document.getElementById("resultado_tabela").style.display = "block";
}

function formatar(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}