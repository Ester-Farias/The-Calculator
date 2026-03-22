function calcular_fgts() {
  const salarioBruto = Number(document.getElementById("salario_bruto").value);
  const dataInicio = new Date(document.getElementById("data_inicio").value);
  const dataFim = new Date(document.getElementById("data_fim").value);

  if (
    !salarioBruto ||
    isNaN(dataInicio.getTime()) ||
    isNaN(dataFim.getTime())
  ) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  if (dataFim < dataInicio) {
    alert("A data final não pode ser menor que a data inicial.");
    return;
  }

  let meses =
    (dataFim.getFullYear() - dataInicio.getFullYear()) * 12 +
    (dataFim.getMonth() - dataInicio.getMonth());

  if (dataFim.getDate() >= dataInicio.getDate()) {
    meses++;
  }

  if (meses < 1) meses = 1;

  const fgtsMensal = salarioBruto * 0.08;
  const totalFgts = fgtsMensal * meses;
  const multaFgts = totalFgts * 0.4;
  const totalReceber = totalFgts + multaFgts;

  document.getElementById("valor_fgts").innerText = formatar(totalFgts);
  document.getElementById("valor_multa").innerText = formatar(multaFgts);
  document.getElementById("resultado_final").innerText = formatar(totalReceber);
  document.getElementById("total_proventos").innerText = formatar(totalReceber);
  document.getElementById("total_descontos").innerText = formatar(0);
  document.getElementById("resultado_13_salario").innerText =
    formatar(totalReceber);

  document.getElementById("resultado_tabela").style.display = "block";

  function formatar(valor) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
}
