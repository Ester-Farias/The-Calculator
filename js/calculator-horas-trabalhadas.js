function horaParaMinutos(hora) {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
}
function calcular_horas_trabalhadas(event) {
  event.preventDefault(); // impede o reload do formulário

  const entrada = document.getElementById("entrada_no_trabalho").value;
  const inicioIntervalo = document.getElementById("inicio_intervalo").value;
  const fimIntervalo = document.getElementById("fim_intervalo").value;
  const saida = document.getElementById("saida_do_trabalho").value;

  if (!entrada || !saida) {
    alert("Preencha pelo menos a entrada e a saída do trabalho.");
    return;
  }

  const entradaMin = horaParaMinutos(entrada);
  const saidaMin = horaParaMinutos(saida);

  let totalMinutos = saidaMin - entradaMin;

  // Se houver intervalo, desconta
  if (inicioIntervalo && fimIntervalo) {
    const inicioIntMin = horaParaMinutos(inicioIntervalo);
    const fimIntMin = horaParaMinutos(fimIntervalo);
    totalMinutos -= fimIntMin - inicioIntMin;
  }

  // Converte para horas e minutos
  const horas = Math.floor(totalMinutos / 60);
  const minutos = totalMinutos % 60;

  // Exibe resultados
  document.getElementById("resultado_entrada_no_trabalho").innerText = entrada;
  document.getElementById("resultado_inicio_do_intervalo").innerText =
    inicioIntervalo || "-";
  document.getElementById("resultado_fim_do_intervalo").innerText =
    fimIntervalo || "-";
  document.getElementById("resultado_saida_do_trabalho").innerText = saida;
  document.getElementById("resultado_total_de_horas_traballhadas").innerText =
    `${horas}h ${minutos}min`;

  // Mostra os <p>
  document.getElementById("resultado_tabela").style.display = "table";
}
