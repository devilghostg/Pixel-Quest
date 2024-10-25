<?php
$host = 'localhost';
$dbname = 'rpg_game';
$username = 'root';
$password = 'root'; 
$conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nom = $_POST['nom'];
    $couleur = $_POST['couleur'];
    $forme = $_POST['forme'];

    try {

        $stmt = $conn->prepare("INSERT INTO joueurs (nom, vie, couleur, forme) VALUES (?, 100, ?, ?)");
        
        $stmt->execute([$nom, $couleur, $forme]);


        header('Location: index.php');
        exit();
    } catch (PDOException $e) {

        echo "Erreur lors de l'insertion des données : " . htmlspecialchars($e->getMessage());
    }
}
?>