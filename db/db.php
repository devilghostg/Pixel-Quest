<?php
include 'connect_db.php';


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $nom = $_POST['nom'];
  $stmt = $pdo->prepare("INSERT INTO joueurs (nom, niveau, vie, xp, inventaire) VALUES (?, 1, 100, 0, '')");
  $stmt->execute([$nom]);
}
?>