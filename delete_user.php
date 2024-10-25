<?php
// Connexion à la base de données
$host = 'localhost';
$dbname = 'rpg_game';
$username = 'root';
$password = 'root'; 
$conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

// Vérifiez que la méthode de requête est POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nom = $_POST['nom'];

    // Préparez la requête de suppression
    $stmt = $conn->prepare("DELETE FROM joueurs WHERE nom = ?");
    $stmt->execute([$nom]);

    // Redirigez vers la page d'accueil après la suppression
    header('Location: index.php');
    exit();
}
?>