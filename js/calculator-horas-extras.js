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

  function aplicarMascaraHora(input) {
  let valor = input.value.replace(/\D/g, "");
  // Limita a 4 dígitos (hhmm)
  if (valor.length > 4) {
    valor = valor.slice(0, 4);
  }
  // Adiciona ":" automaticamente
  if (valor.length > 2) {
    input.value = valor.substring(0, 2) + ":" + valor.substring(2);
  } else {
    input.value = valor;
  }
}
  const inputHorasExtras = document.getElementById("quantidade_horas_extras");
if (inputHorasExtras) {
  inputHorasExtras.addEventListener("input", function () {
    aplicarMascaraHora(this);
  });
}


  aplicarMascaraMoeda(document.getElementById("salario_bruto"));
  aplicarNumeroInteiro(document.getElementById("carga_horaria_mensal"));
  aplicarNumeroInteiro(document.getElementById("porcent_hora_extra"));
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
// MÁSCARA DE HORA (hh:mm)
// =============================

// =============================
// ATIVA MÁSCARA AO DIGITAR
// =============================

// =============================
// FUNÇÃO PRINCIPAL DE CÁLCULO
// =============================
function calcular_horas_extras() {

  const salarioInput = document.getElementById("salario_bruto").value;
  const cargaMensal = Number(document.getElementById("carga_horaria_mensal").value);
  const percentualExtra = Number(document.getElementById("porcent_hora_extra").value);
  const horasExtrasInput = document.getElementById("quantidade_horas_extras").value;

  // =============================
  // VALIDAÇÃO
  // =============================
  if (!salarioInput || !cargaMensal || !percentualExtra || !horasExtrasInput) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  // =============================
  // CONVERTE SALÁRIO
  // =============================
  const salario = parseFloat(
    salarioInput.replace(/\./g, "").replace(",", ".")
  );

  // =============================
  // CONVERTER hh:mm → horas
  // =============================
  const partes = horasExtrasInput.split(":");

  if (partes.length !== 2) {
    alert("Formato inválido. Use hh:mm");
    return;
  }

  const horas = Number(partes[0]);
  const minutos = Number(partes[1]);

  const horasExtras = horas + (minutos / 60);

  // =============================
  // CÁLCULOS
  // =============================
  const valorHora = salario / cargaMensal;
  const adicional = percentualExtra / 100;
  const valorHoraExtra = valorHora * (1 + adicional);
  const totalHorasExtras = valorHoraExtra * horasExtras;

  // =============================
  // EXIBIÇÃO
  // =============================
  document.getElementById("salario_bruto_result").innerText = formatar(totalHorasExtras);
  document.getElementById("valor_final").innerText = formatar(0);
  document.getElementById("total_proventos").innerText = formatar(totalHorasExtras);
  document.getElementById("total_descontos").innerText = formatar(0);
  document.getElementById("resultado_13_salario").innerText = formatar(totalHorasExtras);
  document.getElementById("resultado_aliquota_tabela").style.display = "block";
  document.getElementById("resultado_tabela").style.display = "block";
}
