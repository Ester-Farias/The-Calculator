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


function calcular_fgts() {

  const salarioInput = document.getElementById("salario_bruto").value;
  const dataInicio = document.getElementById("data_inicio").value;
  const dataFim = document.getElementById("data_fim").value;

  const salario = parseFloat(
    salarioInput.replace(/\./g, "").replace(",", ".")
  );

  if (!salario || !dataInicio || !dataFim) {
    alert("Preencha todos os campos.");
    return;
  }

  const admissao = new Date(dataInicio);
  const demissao = new Date(dataFim);

  if (demissao < admissao) {
    alert("A data de demissão não pode ser menor que a admissão.");
    return;
  }

  // =============================
  // CALCULAR MESES TRABALHADOS
  // =============================

  let anos = demissao.getFullYear() - admissao.getFullYear();
  let meses = demissao.getMonth() - admissao.getMonth();

  let totalMeses = anos * 12 + meses;

  if (demissao.getDate() >= admissao.getDate()) {
    totalMeses += 1;
  }

  if (totalMeses < 0) totalMeses = 0;

  // =============================
  // FGTS
  // =============================

  const fgtsMensal = salario * 0.08;
  const fgtsTotal = fgtsMensal * totalMeses;

  // =============================
  // MULTA 40%
  // =============================

  const multa = fgtsTotal * 0.40;

  const totalReceber = fgtsTotal + multa;

  // =============================
  // EXIBIÇÃO
  // =============================

  document.getElementById("valor_fgts").innerText = formatar(fgtsTotal);
  document.getElementById("valor_multa").innerText = formatar(multa);
  document.getElementById("resultado_final").innerText = formatar(totalReceber);

  document.getElementById("total_proventos").innerText = formatar(totalReceber);
  document.getElementById("total_descontos").innerText = formatar(0);

  document.getElementById("resultado_13_salario").innerText = formatar(totalReceber);

  document.getElementById("resultado_tabela").style.display = "block";
}

// função de formatação
function formatar(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}