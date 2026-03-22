  // =============================
  //  Security
  // =============================
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
      e.target.value = numero;
    });
  }
  // aplica nos inputs
  aplicarMascara(document.getElementById("salario_bruto"));
  aplicarMascara(document.getElementById("dias_de_ferias"));
  aplicarMascara(document.getElementById("num_dependentes"));
  aplicarMascara(document.getElementById("opcoes_recebimento_ferias"));
});

  // =============================
  //  Moeda
  // =============================
function formatar(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

  // =============================
  //  Calculadora de Férias
  // =============================
function calcular_ferias() {
  const salarioInput = document.getElementById("salario_bruto").value;
  const salarioBruto = parseFloat(salarioInput.replace(/\./g, "").replace(",", "."));
  const diasFerias = Number(document.getElementById("dias_de_ferias").value);
  const opcao = Number(document.getElementById("opcoes_recebimento_ferias").value);

  if (!salarioBruto || !diasFerias || diasFerias < 1 || diasFerias > 31) {
    alert("Preencha os campos corretamente.");
    return;
  }
  const valorDia = salarioBruto / 30;
  const valorFerias = valorDia * diasFerias;
  const adicionalUmTerco = valorFerias / 3;

  let abono = 0;
  let adicionalAbono = 0;
  let adiantamento13 = 0;

  // =============================
  //  OPÇÕES
  // =============================

  if (opcao === 1) {
    adiantamento13 = salarioBruto / 2;
  }

  if (opcao === 2) {
    const diasVendidos = diasFerias;
    abono = valorDia * diasVendidos;
    adicionalAbono = abono / 3;
  }

  // =============================
  //  TOTAL
  // =============================

  const totalBruto = valorFerias + adicionalUmTerco + abono + adicionalAbono + adiantamento13;
  const inss = totalBruto * 0.09;
  const totalLiquido = totalBruto - inss;




  // =============================
  //  CÁLCULO BASE DAS FÉRIAS
  // =============================

  
  // =============================
  //  EXIBIÇÃO
  // =============================
  document.getElementById("salario_bruto_result").innerText = formatar(totalBruto);
  document.getElementById("valor_final").innerText = formatar(inss);
  document.getElementById("total_proventos").innerText = formatar(totalBruto);
  document.getElementById("total_descontos").innerText = formatar(inss);
  document.getElementById("resultado_13_salario").innerText = formatar(totalLiquido);
  document.getElementById("resultado_tabela").style.display = "block";
};
