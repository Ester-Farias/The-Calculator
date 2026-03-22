<?php

// Mostrar erros (apenas para desenvolvimento)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// conexão com banco
require "config.php";

// verificar se veio via POST
if($_SERVER["REQUEST_METHOD"] !== "POST"){
    die("Acesso inválido.");
}

// pegar dados do formulário
$nome = trim($_POST['nome'] ?? '');
$email = trim($_POST['email'] ?? '');
$mensagem = trim($_POST['mensagem'] ?? '');

// validações básicas
if(strlen($nome) < 3){
    die("Nome inválido.");
}

if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
    die("Email inválido.");
}

if(strlen($mensagem) < 5){
    die("Mensagem muito curta.");
}

// variável do arquivo
$arquivo_nome = null;

// verificar se existe upload
if(isset($_FILES['arquivo']) && $_FILES['arquivo']['error'] === 0){

    $pasta = "uploads/";

    // criar pasta se não existir
    if(!is_dir($pasta)){
        mkdir($pasta, 0777, true);
    }

    // pegar extensão
    $ext = strtolower(pathinfo($_FILES['arquivo']['name'], PATHINFO_EXTENSION));

    // extensões permitidas
    $ext_permitidas = ["jpg","jpeg","png","pdf"];

    if(!in_array($ext, $ext_permitidas)){
        die("Tipo de arquivo não permitido.");
    }

    // gerar nome único
    $arquivo_nome = uniqid("upload_", true) . "." . $ext;

    $caminho = $pasta . $arquivo_nome;

    // mover arquivo
    if(!move_uploaded_file($_FILES['arquivo']['tmp_name'], $caminho)){
        die("Erro ao salvar o arquivo.");
    }

}

// inserir no banco com prepared statement
$stmt = $conn->prepare("
INSERT INTO contatos (nome,email,mensagem,arquivo)
VALUES (?,?,?,?)
");

$stmt->bind_param("ssss",$nome,$email,$mensagem,$arquivo_nome);

if($stmt->execute()){
    
    // redirecionar para página de contato
    header("Location: contato.html?sucesso=1");
    exit;

}else{

    echo "Erro ao salvar no banco.";

}

$stmt->close();
$conn->close();

?>