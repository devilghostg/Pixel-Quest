<?php
// Connexion à la base de données
$host = 'localhost';
$dbname = 'rpg_game';
$username = 'root';
$password = 'root'; 
$conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nom = $_POST['nom'];
    $tempsDeSurvie = $_POST['temps']; 

    // Préparation de la requête d'insertion
    $stmt = $conn->prepare("INSERT INTO joueurs (nom, niveau, vie, xp, inventaire, temps_de_survie) VALUES (?, 1, 100, 0, '', ?)");
    $stmt->execute([$nom, $tempsDeSurvie]); // Insertion des valeurs

    // Redirection vers la page d'accueil ou une autre page
    header('Location: game.html');
    exit();
}
?>