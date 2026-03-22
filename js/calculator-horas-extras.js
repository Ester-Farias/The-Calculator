function calcular_horas_extras() {
  const salarioBruto = Number(document.getElementById("salario_bruto").value);
  const cargaHoraria = Number(
    document.getElementById("carga_horaria_mensal").value,
  );
  const percentualExtra = Number(
    document.getElementById("porcent_hora_extra").value,
  );

  const horasExtrasTexto = document.getElementById(
    "quantidade_horas_extras",
  ).value;

  const horasExtras = converterHorasParaDecimal(horasExtrasTexto);

  if (
    !salarioBruto ||
    !cargaHoraria ||
    !percentualExtra ||
    isNaN(horasExtras)
  ) {
    alert("Preencha todos os campos corretamente (hh:mm).");
    return;
  }

  const valorHora = salarioBruto / cargaHoraria;
  const valorHoraExtra = valorHora * (1 + percentualExtra / 100);
  const totalHorasExtras = valorHoraExtra * horasExtras;

  const inss = totalHorasExtras * 0.09;
  const valorLiquido = totalHorasExtras - inss;

  document.getElementById("salario_bruto_result").innerText =
    formatar(totalHorasExtras);
  document.getElementById("valor_final").innerText = formatar(inss);
  document.getElementById("total_proventos").innerText =
    formatar(totalHorasExtras);
  document.getElementById("total_descontos").innerText = formatar(inss);
  document.getElementById("resultado_13_salario").innerText =
    formatar(valorLiquido);

  document.getElementById("resultado_tabela").style.display = "block";
}

function converterHorasParaDecimal(horas) {
  const [h, m] = horas.split(":").map(Number);
  if (isNaN(h) || isNaN(m) || m >= 60) return NaN;
  return h + m / 60;
}

function formatar(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
