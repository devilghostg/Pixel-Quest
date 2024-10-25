<?php

// Connexion à la base de données
$host = 'localhost';
$dbname = 'rpg_game';
$username = 'root';
$password = 'root'; 
$conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);


$scores = $conn->query("SELECT nom, niveau, vie, xp, inventaire FROM joueurs ORDER BY xp DESC LIMIT 5")->fetchAll(PDO::FETCH_ASSOC);
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
        <h1>Bienvenue dans le RPG !</h1>

        <!-- Formulaire de personnalisation du joueur -->
        <div class="personalization">
            <h2>Personnalisez votre personnage</h2>
            <form id="playerForm" method="POST" action="save_player.php">
                <label for="nom">Nom du joueur :</label>
                <input type="text" id="nom" name="nom" required>
                <button type="submit">Sauvegarder</button>
            </form>
        </div>

        <!-- Tableau de scores -->
        <div class="scoreboard">
            <h2>Tableau des Scores</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Vie</th>
                        <th>XP</th>
                        <th>Actions</th> <!-- Ajoutez une colonne pour les actions -->
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($scores as $score): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($score['nom']); ?></td>
                        <td><?php echo htmlspecialchars($score['vie']); ?></td>
                        <td><?php echo htmlspecialchars($score['xp']); ?></td>
                        <td>
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
            <a href="game.html" class="button">Jouer</a>
        </div>
    </div>
</body>
</html>