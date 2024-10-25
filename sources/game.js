document.addEventListener('DOMContentLoaded', function() {
    const gameArea = document.getElementById('game');
    const player = document.createElement('div');
    player.className = 'player';
    player.style.left = '50px';
    player.style.top = '50px';

    const playerHealthBar = document.createElement('div');
    playerHealthBar.className = 'health-bar';
    player.appendChild(playerHealthBar);
    gameArea.appendChild(player);

    const enemies = [];

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

    let playerPosition = { x: 50, y: 50 };
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
        if (e.key === ' ' && !gameOver) { // Attaque uniquement si le jeu n'est pas terminé
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
        const enemySpeed = 0.5; // Ajuste cette valeur pour changer la vitesse des ennemis
    
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
                const moveX = (dx / distance) * enemySpeed; // Applique la vitesse ici
                const moveY = (dy / distance) * enemySpeed; // Applique la vitesse ici
    
                enemyPosition.x += moveX;
                enemyPosition.y += moveY;
    
                enemy.element.style.left = enemyPosition.x + 'px';
                enemy.element.style.top = enemyPosition.y + 'px';
    
                // Gestion des dégâts infligés au joueur
                if (distance < 30) {
                    playerHealth -= 0.5;
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
            survivalTime += 0.016; // Incrémente le temps de survie (en secondes)
            requestAnimationFrame(gameLoop);
        }
    }
    

    // Écran de fin de jeu
    function gameOverScreen() {
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
    }

    updateHealthBar({ healthBar: playerHealthBar }, playerHealth);
    gameLoop();
});