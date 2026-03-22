function calcularIRRF() {

let salario = Number(document.getElementById("salario_bruto").value);
let extras = Number(document.getElementById("horas_extras").value);
let dependentes = Number(document.getElementById("dependentes").value);
let pensao = Number(document.getElementById("pensao").value);
let previdencia = Number(document.getElementById("previdencia").value);
let modelo = document.getElementById("modelo").value;

let totalRendimentos = salario + extras;

/* ================= INSS PROGRESSIVO ================= */

let inss = 0;
const faixasINSS = [
{ limite: 1518.00, aliquota: 0.075 },
{ limite: 2793.88, aliquota: 0.09 },
{ limite: 4190.83, aliquota: 0.12 },
{ limite: 8157.41, aliquota: 0.14 }
];

let restante = totalRendimentos;
let limiteAnterior = 0;

for (let faixa of faixasINSS) {
if (restante <= 0) break;
let teto = faixa.limite - limiteAnterior;
let valorFaixa = Math.min(restante, teto);
inss += valorFaixa * faixa.aliquota;
restante -= valorFaixa;
limiteAnterior = faixa.limite;
}

/* ================= DEDUÇÕES ================= */

let deducaoDependentes = dependentes * 189.59;
let baseCalculo = totalRendimentos - inss;

if (modelo === "simplificado") {
let descontoSimplificado = baseCalculo * 0.20;
if (descontoSimplificado > 528) descontoSimplificado = 528;
baseCalculo -= descontoSimplificado;
} else {
baseCalculo -= (deducaoDependentes + pensao + previdencia);
}

/* ================= IRRF ================= */

let irrf = 0;

if (baseCalculo <= 2259.20) {
irrf = 0;
} else if (baseCalculo <= 2826.65) {
irrf = baseCalculo * 0.075 - 169.44;
} else if (baseCalculo <= 3751.05) {
irrf = baseCalculo * 0.15 - 381.44;
} else if (baseCalculo <= 4664.68) {
irrf = baseCalculo * 0.225 - 662.77;
} else {
irrf = baseCalculo * 0.275 - 896.00;
}

if (irrf < 0) irrf = 0;

let salarioLiquido = totalRendimentos - inss - irrf;

/* ================= MOSTRAR RESULTADOS ================= */

document.getElementById("rendimentos").innerHTML = 
"R$ " + totalRendimentos.toLocaleString("pt-BR",{minimumFractionDigits:2});

document.getElementById("inss").innerHTML = 
"- R$ " + inss.toLocaleString("pt-BR",{minimumFractionDigits:2});

document.getElementById("base").innerHTML = 
"R$ " + baseCalculo.toLocaleString("pt-BR",{minimumFractionDigits:2});

document.getElementById("irrf").innerHTML = 
"- R$ " + irrf.toLocaleString("pt-BR",{minimumFractionDigits:2});

document.getElementById("liquido").innerHTML = 
"R$ " + salarioLiquido.toLocaleString("pt-BR",{minimumFractionDigits:2});

document.getElementById("resultado_tabela").style.display = "block";
}