  // =============================
  //  Security
  // =============================
document.addEventListener("DOMContentLoaded", function () {
  function aplicarMascaraMoeda(input) {
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
  function aplicarNumeroInteiro(input, max = null) {
    if (!input) return;
    input.addEventListener("input", function (e) {
      let valor = e.target.value.replace(/\D/g, ""); // remove caracteres
      if (max !== null && Number(valor) > max) {
        valor = max;
      }
      e.target.value = valor;
    });
  }
  aplicarMascaraMoeda(document.getElementById("salario_bruto"));
  aplicarNumeroInteiro(document.getElementById("dias_de_ferias"), 30);
  aplicarNumeroInteiro(document.getElementById("num_dependentes"), 10);
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

  const salarioBruto = parseFloat(
    salarioInput.replace(/\./g, "").replace(",", ".")
  );

  const diasFerias = Number(
    document.getElementById("dias_de_ferias").value
  );

  const dependentes = Number(
    document.getElementById("num_dependentes").value || 0
  );

  const opcao = Number(
    document.getElementById("opcoes_recebimento_ferias").value
  );

  if (!salarioBruto || diasFerias < 1 || diasFerias > 30) {
    alert("Preencha os campos corretamente.");
    return;
  }

  // =============================
  // BASE
  // =============================

  const valorDia = salarioBruto / 30;
  const valorFerias = valorDia * diasFerias;
  const adicionalUmTerco = valorFerias / 3;

  let abono = 0;
  let adicionalAbono = 0;
  let adiantamento13 = 0;

  // =============================
  // OPÇÕES
  // =============================

  // Adiantamento do 13°
  if (opcao === 1) {
    adiantamento13 = salarioBruto / 2;
  }

  // Venda de férias (máx 10 dias)
  if (opcao === 2) {
    const diasVendidos = Math.min(10, 30 - diasFerias);
    abono = valorDia * diasVendidos;
    adicionalAbono = abono / 3;
  }

  // =============================
  // TOTAL BRUTO
  // =============================

  const totalBruto =
    valorFerias +
    adicionalUmTerco +
    abono +
    adicionalAbono +
    adiantamento13;

  // =============================
  // DESCONTOS
  // =============================

  const inss = totalBruto * 0.09;

  // desconto simples por dependente (base IRRF aproximado)
  const descontoDependente = dependentes * 189.59;

  const baseIR = totalBruto - inss - descontoDependente;

  let irrf = 0;

  if (baseIR > 2826.65) {
    irrf = baseIR * 0.075;
  }

  // =============================
  // TOTAL LÍQUIDO
  // =============================

  const totalLiquido = totalBruto - inss - irrf;

  // =============================
  // EXIBIÇÃO
  // =============================

  document.getElementById("salario_bruto_result").innerText =
    formatar(totalBruto);

  document.getElementById("valor_final").innerText =
    formatar(inss + irrf);

  document.getElementById("total_proventos").innerText =
    formatar(totalBruto);

  document.getElementById("total_descontos").innerText =
    formatar(inss + irrf);

  document.getElementById("resultado_13_salario").innerText =
    formatar(totalLiquido);

  document.getElementById("resultado_tabela").style.display = "block";
}