<?php
// Récupérer le nom du joueur à partir des paramètres d'URL
$playerName = isset($_GET['nom']) ? htmlspecialchars($_GET['nom']) : 'Joueur inconnu';
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pixel Quest</title>
    <link rel="stylesheet" href="sources/game.css">
</head>
<body>
    <header>
        <h4 class="return"><a href="index.php">Retour Accueil</a></h4>
        <h1>La partie de : <?php echo $playerName; ?></h1>
    </header>

    <main>
        <div id="victoryModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <p>Victoire !</p>
            </div>
        </div>
        <div id="scoreboard">
            <h2>Tableau des Scores</h2>
            <ol id="score-list"></ol>
        </div>
        <!-- Zone de jeu -->
        <div id="game"></div>
    </main>

    <script src="sources/game.js"></script>
</body>
</html>