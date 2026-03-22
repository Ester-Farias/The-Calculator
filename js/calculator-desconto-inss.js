function calcularINSS(event) {
  event.preventDefault();

  const salario = Number(document.getElementById("salario_bruto").value);

  if (!salario || salario <= 0) {
    alert("Digite um salário válido.");
    return;
  }

  let inss = 0;

  const faixas = [
    { limite: 1518.00, aliquota: 0.075 },
    { limite: 2793.88, aliquota: 0.09 },
    { limite: 4190.83, aliquota: 0.12 },
    { limite: 8157.41, aliquota: 0.14 }
  ];

  let salarioRestante = salario;
  let limiteAnterior = 0;

  for (let i = 0; i < faixas.length; i++) {
    if (salarioRestante <= 0) break;

    let tetoFaixa = faixas[i].limite - limiteAnterior;
    let valorFaixa = Math.min(salarioRestante, tetoFaixa);

    inss += valorFaixa * faixas[i].aliquota;

    salarioRestante -= valorFaixa;
    limiteAnterior = faixas[i].limite;
  }

  const salarioLiquido = salario - inss;

  // Mostra valor descontado
  document.getElementById("valor_inss").innerHTML =
    "R$ " + inss.toFixed(2).replace(".", ",");

  // Mostra salário líquido
  document.getElementById("resultado_13_salario").innerHTML =
    "R$ " + salarioLiquido.toFixed(2).replace(".", ",");

  document.getElementById("resultado_tabela").style.display = "block";
}