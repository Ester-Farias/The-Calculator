<?php

$host = "localhost";
$user = "root";
$password = "";
$db = "calculadora_site";

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

?>