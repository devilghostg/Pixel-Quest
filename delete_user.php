<?php
// Connexion à la base de données
$host = 'localhost';
$dbname = 'rpg_game';
$username = 'root';
$password = 'root'; 
$conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nom = $_POST['nom'];


    $stmt = $conn->prepare("DELETE FROM joueurs WHERE nom = ?");
    $stmt->execute([$nom]);

    header('Location: index.php');
    exit();
}
?>