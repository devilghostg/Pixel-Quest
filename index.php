<?php

// Connexion à la base de données
$host = 'localhost';
$dbname = 'rpg_game';
$username = 'root';
$password = 'root'; 
$conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

$scores = $conn->query("SELECT nom, vie, temps_de_jeu FROM joueurs ORDER BY nom DESC LIMIT 5")->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accueil du Jeu RPG</title>
    <link rel="stylesheet" href="sources/style.css"> 
</head>
<body>
    <div class="container">
        <h1>Bienvenue dans le FORPG !</h1>

        <div class="personalization">
            <h2>Personnalisez votre personnage</h2>
            <form id="playerForm" method="POST" action="save_player.php">
                <input type="text" placeholder="Entrz votre speudo" id="nom" name="nom" required>
                <button type="submit">Sauvegarder</button>
            </form>
        </div>

        <div class="scoreboard">
            <h2>Tableau des Scores</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Vie</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($scores as $score): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($score['nom']); ?></td>
                        <td><?php echo htmlspecialchars($score['vie']); ?></td>
                        <td>
                            <!-- Lien pour jouer avec ce joueur -->
                            <a href="game.php?nom=<?php echo urlencode($score['nom']); ?>" class="button">Jouer</a>
                            <!-- Bouton de suppression -->
                            <form method="POST" action="delete_user.php" style="display:inline;">
                                <input type="hidden" name="nom" value="<?php echo htmlspecialchars($score['nom']); ?>">
                                <button type="submit" onclick="return confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?');">Supprimer</button>
                            </form>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>

        <!-- Bouton pour jouer -->
        <div class="play-button">
            <h2>Prêt à jouer ?</h2>
            <a href="game.php" class="button">Jouer</a>
        </div>
    </div>
</body>
</html>