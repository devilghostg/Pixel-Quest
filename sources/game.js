document.addEventListener('DOMContentLoaded', function() {
    const gameArea = document.getElementById('game');
    const player = document.createElement('div');
    const randomPlayerX = Math.random() * 370;
    const randomPlayerY = Math.random() * 370;
    player.className = 'player';
    player.style.left = randomPlayerX + 'px';
    player.style.top = randomPlayerY + 'px';

    const playerHealthBar = document.createElement('div');
    playerHealthBar.className = 'health-bar';
    player.appendChild(playerHealthBar);
    gameArea.appendChild(player);

    const enemies = [];
    let highScores = JSON.parse(localStorage.getItem('highScores')) || []; // Récupérer les scores existants

    function createEnemy(x, y) {
        const enemy = document.createElement('div');
        enemy.className = 'enemy';
        enemy.style.left = x + 'px';
        enemy.style.top = y + 'px';

        const enemyHealthBar = document.createElement('div');
        enemyHealthBar.className = 'health-bar';
        enemy.appendChild(enemyHealthBar);

        gameArea.appendChild(enemy);
        enemies.push({ element: enemy, health: 100, healthBar: enemyHealthBar });
    }

    for (let i = 0; i < 5; i++) {
        createEnemy(Math.random() * 370, Math.random() * 370);
    }

    let playerPosition = { x: randomPlayerX, y: randomPlayerY };
    let playerHealth = 100;
    let survivalTime = 0; // Pour suivre le temps de survie
    let gameOver = false; // Pour indiquer que le jeu est terminé

    function updateHealthBar(character, health) {
        character.healthBar.style.width = health * 0.3 + 'px';
        character.healthBar.style.backgroundColor = health > 50 ? 'green' : (health > 20 ? 'orange' : 'red');
    }

    document.addEventListener('keydown', function(e) {
        if (gameOver) return; // Ignorer les mouvements si le jeu est terminé

        switch(e.key) {
            case 'ArrowUp': playerPosition.y -= 10; break;
            case 'ArrowDown': playerPosition.y += 10; break;
            case 'ArrowLeft': playerPosition.x -= 10; break;
            case 'ArrowRight': playerPosition.x += 10; break;
        }

        playerPosition.x = Math.max(0, Math.min(370, playerPosition.x));
        playerPosition.y = Math.max(0, Math.min(370, playerPosition.y));

        player.style.left = playerPosition.x + 'px';
        player.style.top = playerPosition.y + 'px';
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === ' ' && !gameOver) {
            enemies.forEach(enemy => {
                const enemyPosition = {
                    x: parseInt(enemy.element.style.left),
                    y: parseInt(enemy.element.style.top)
                };

                const distance = Math.sqrt(Math.pow(playerPosition.x - enemyPosition.x, 2) + Math.pow(playerPosition.y - enemyPosition.y, 2));
                
                if (distance < 40) {
                    enemy.health -= 20;
                    updateHealthBar(enemy, enemy.health);

                    if (enemy.health <= 0) {
                        enemy.element.remove();
                    }
                }
            });
        }
    });

    function moveEnemies() {
        const enemySpeed = 1; 
    
        enemies.forEach(enemy => {
            const enemyPosition = {
                x: parseInt(enemy.element.style.left),
                y: parseInt(enemy.element.style.top)
            };
    
            const dx = playerPosition.x - enemyPosition.x;
            const dy = playerPosition.y - enemyPosition.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
    
            if (distance > 0) {
                // Calcule la direction normalisée
                const moveX = (dx / distance) * enemySpeed; 
                const moveY = (dy / distance) * enemySpeed; 
    
                enemyPosition.x += moveX;
                enemyPosition.y += moveY;
    
                // Met à jour la position de l'ennemi
                enemy.element.style.left = enemyPosition.x + 'px';
                enemy.element.style.top = enemyPosition.y + 'px';
    
                // Gestion des dégâts infligés au joueur
                if (distance < 30) {
                    playerHealth -= 0.4;
                    updateHealthBar({ healthBar: playerHealthBar }, playerHealth);
                    if (playerHealth <= 0) {
                        gameOver = true; // Indiquer que le jeu est terminé
                        gameOverScreen(); // Afficher l'écran de fin de jeu
                    }
                }
            }
        });
    }
    

    function gameLoop() {
        if (!gameOver) {
            moveEnemies();
            updateHealthBar({ healthBar: playerHealthBar }, playerHealth);
            survivalTime += 0.016; 
            requestAnimationFrame(gameLoop);
        }
    }

    // Fonction pour mettre à jour le tableau des scores
    function updateScoreboard() {
        const scoreList = document.getElementById('score-list');
        scoreList.innerHTML = ''; 

        highScores.sort((a, b) => b.time - a.time); 

        highScores.slice(0, 5).forEach(score => {
            const li = document.createElement('li');
            li.textContent = `Joueur: ${score.name}, Temps: ${score.time.toFixed(2)} secondes`;
            scoreList.appendChild(li);
        });
    }

// Écran de fin de jeu
    function gameOverScreen() {
        const playerName = prompt("Entrez votre nom :"); 
        if (playerName) {
            highScores.push({ name: playerName, time: survivalTime });
            localStorage.setItem('highScores', JSON.stringify(highScores)); 
        }

        const gameOverDiv = document.createElement('div');
        gameOverDiv.className = 'game-over';
        gameOverDiv.innerHTML = `
            <h2>Game Over!</h2>
            <p>Temps de survie: ${survivalTime.toFixed(2)} secondes</p>
            <button id="restart-btn">Recommencer</button>
        `;
        gameArea.appendChild(gameOverDiv);

        // Gestion du bouton de redémarrage
        document.getElementById('restart-btn').addEventListener('click', function() {
            location.reload(); 
        });

        updateScoreboard(); // Met à jour le tableau des scores après la fin du jeu
    }

    updateHealthBar({ healthBar: playerHealthBar }, playerHealth);
    gameLoop(); // Démarre la boucle de jeu
});