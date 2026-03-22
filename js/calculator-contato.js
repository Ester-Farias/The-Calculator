document.getElementById("formContato").addEventListener("submit", function(e){

let nome = document.querySelector("[name='nome']").value.trim()
let email = document.querySelector("[name='email']").value.trim()
let mensagem = document.querySelector("[name='mensagem']").value.trim()

if(nome.length < 3){
alert("Nome muito curto")
e.preventDefault()
return
}

if(mensagem.length < 10){
alert("Mensagem muito curta")
e.preventDefault()
return
}

})