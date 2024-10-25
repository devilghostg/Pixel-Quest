<?php
// Connexion à la base de données
$host = 'localhost';
$dbname = 'rpg_game';
$username = 'root';
$password = 'root'; 
$conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $selected_player = $_POST['selected_player'];
    $new_nom = $_POST['new_nom'];

    if (!empty($new_nom) && !preg_match('/\s/', $new_nom)) {
        $stmt = $conn->prepare("UPDATE joueurs SET nom = :new_nom WHERE nom = :selected_player");
        $stmt->bindParam(':new_nom', $new_nom);
        $stmt->bindParam(':selected_player', $selected_player);

        if ($stmt->execute()) {
            header('Location: index.php?message=Pseudo modifié avec succès.');
            exit;
        } else {
            // Gérer l'erreur
            echo "Erreur lors de la mise à jour du pseudo.";
        }
    } else {
        echo "Le pseudo ne doit pas être vide ou contenir des espaces.";
    }
}
?>