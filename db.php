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

    $stmt = $conn->prepare("INSERT INTO joueurs (nom, niveau, vie, temps_de_jeu) VALUES (?, 1, 100, ?)");
    $stmt->execute([$nom, $tempsDeSurvie]); 

    header('Location: game.html');
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $time = $data['time'];

    session_start();
    $playerId = $_SESSION['player_id'];

    $stmt = $conn->prepare("UPDATE joueurs SET temps_de_jeu = temps_de_jeu + ? WHERE id = ?");
    $stmt->execute([$xp, $time, $playerId]);

    echo json_encode(['status' => 'success']);
    exit();
}

?>