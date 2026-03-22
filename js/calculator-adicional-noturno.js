function calcularAdicionalNoturno() {

let salario = Number(document.getElementById("salario").value);
let carga = Number(document.getElementById("carga_mensal").value);
let horasNoturnas = Number(document.getElementById("horas_noturnas").value);
let percentual = Number(document.getElementById("percentual").value) / 100;
let horaReduzida = document.getElementById("hora_reduzida").value;

if (!salario || !carga || !horasNoturnas) {
alert("Preencha todos os campos corretamente.");
return;
}

/* ================= VALOR DA HORA NORMAL ================= */

let valorHora = salario / carga;

/* ================= HORA NOTURNA REDUZIDA ================= */
/* 52min30s = 52.5 minutos */
/* 60 / 52.5 = 1.142857 */

let horasCalculadas = horasNoturnas;

if (horaReduzida === "sim") {
horasCalculadas = horasNoturnas * (60 / 52.5);
}

/* ================= CÁLCULO DO ADICIONAL ================= */

let valorAdicional = valorHora * percentual * horasCalculadas;

/* ================= TOTAL FINAL ================= */

let totalReceber = valorAdicional;

/* ================= MOSTRAR RESULTADOS ================= */

document.getElementById("valor_hora").innerHTML =
"R$ " + valorHora.toLocaleString("pt-BR",{minimumFractionDigits:2});

document.getElementById("horas_calc").innerHTML =
horasCalculadas.toFixed(2) + " h";

document.getElementById("valor_adicional").innerHTML =
"R$ " + valorAdicional.toLocaleString("pt-BR",{minimumFractionDigits:2});

document.getElementById("total_final").innerHTML =
"R$ " + totalReceber.toLocaleString("pt-BR",{minimumFractionDigits:2});

document.getElementById("resultado_tabela").style.display = "block";
}