<?php
// Connexion à la base de données
$host = 'localhost';
$dbname = 'rpg_game';
$username = 'root';
$password = 'root'; 
$conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nom = $_POST['nom'];

    // Insérer le joueur dans la base de données
    $stmt = $conn->prepare("INSERT INTO joueurs (nom, niveau, vie, xp, inventaire) VALUES (?, 1, 100, 0, '')");
    $stmt->execute([$nom]);

    // Redirection vers la page d'accueil
    header('Location: index.php');
    exit();
}
?>