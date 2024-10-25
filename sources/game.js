document.addEventListener('DOMContentLoaded', function() {
    const gameArea = document.getElementById('game');
    const player = document.createElement('div');
    player.className = 'player';
    player.style.left = '180px';
    player.style.bottom = '0px';
    const playerColor = document.getElementById("couleur").value; 
    const playerShape = document.getElementById("forme").value;
    
    // Appliquer la couleur et la tforme
    player.style.backgroundColor = playerColor;
    player.classList.add(playerShape);

    const playerHealthBar = document.createElement('div');
    playerHealthBar.className = 'health-bar';
    player.appendChild(playerHealthBar);
    gameArea.appendChild(player);

    const enemies = [];
    let playerPosition = { x: 180 };
    let playerHealth = 100;
    let enemySpeed = 1;
    let enemyDirection = 1;
    let boss;
    let bossDirection = 1; // Direction du boss (1 pour droite, -1 pour gauche)

    function createEnemy(x, y) {
        const enemy = document.createElement('div');
        enemy.className = 'enemy';
        enemy.style.left = x + 'px';
        enemy.style.top = y + 'px';

        const enemyHealthBar = document.createElement('div');
        enemyHealthBar.className = 'health-bar';
        enemy.appendChild(enemyHealthBar);

        gameArea.appendChild(enemy);
        enemies.push({ element: enemy, health: 100, healthBar: enemyHealthBar, hasExited: false });
    }

    for (let i = 0; i < 5; i++) {
        createEnemy(Math.random() * 370, Math.random() * 50);
    }

    function updateHealthBar(character, health) {
        character.healthBar.style.width = health * 0.3 + 'px';
        character.healthBar.style.backgroundColor = health > 50 ? 'green' : (health > 20 ? 'orange' : 'red');
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') playerPosition.x -= 10;
        if (e.key === 'ArrowRight') playerPosition.x += 10;
        if (e.key === ' ') shootLaser();

        playerPosition.x = Math.max(0, Math.min(370, playerPosition.x));
        player.style.left = playerPosition.x + 'px';
        updateHealthBar({ healthBar: playerHealthBar }, playerHealth);
    });

    function moveEnemies() {
        enemies.forEach(enemy => {
            const enemyPosition = {
                x: parseInt(enemy.element.style.left),
                y: parseInt(enemy.element.style.top)
            };

            enemyPosition.x += enemySpeed * enemyDirection;

            if (enemyPosition.x <= 0 || enemyPosition.x >= 370) {
                enemyDirection *= -1;
                enemies.forEach(e => e.element.style.top = (parseInt(e.element.style.top) + 10) + 'px');
            }

            enemy.element.style.left = enemyPosition.x + 'px';

            // Vérifier si l'ennemi a quitté l'écran
            if (parseInt(enemy.element.style.top) > gameArea.offsetHeight) {
                enemy.hasExited = true; // Marque l'ennemi comme sorti de l'écran
            }
        });

        if (enemies.length === 0 && !boss) {
            createBoss();
        }
    }

    function createBoss() {
        boss = document.createElement('div');
        boss.className = 'boss';
        boss.style.left = '200px';
        boss.style.top = '10px';

        const bossHealthBar = document.createElement('div');
        bossHealthBar.className = 'health-bar';
        boss.appendChild(bossHealthBar);

        gameArea.appendChild(boss);
        boss.health = 300;
        updateHealthBar({ healthBar: bossHealthBar }, boss.health);
    }

    function moveBoss() {
        if (boss) {
            const bossPositionX = parseInt(boss.style.left);
            boss.style.left = (bossPositionX + 3 * bossDirection) + 'px';

            // Inverse la direction du boss s'il atteint le bord du jeu
            if (bossPositionX <= 0 || bossPositionX >= 370) {
                bossDirection *= -1;
            }
        }
    }

    function shootLaser() {
        const laser = document.createElement('div');
        laser.className = 'laser';
        laser.style.left = playerPosition.x + 'px';
        laser.style.bottom = '30px';
        gameArea.appendChild(laser);

        const laserInterval = setInterval(() => {
            laser.style.top = laser.offsetTop - 5 + 'px';

            enemies.forEach((enemy, index) => {
                const enemyPosition = {
                    x: parseInt(enemy.element.style.left),
                    y: parseInt(enemy.element.style.top)
                };

                if (
                    laser.offsetLeft < enemyPosition.x + 30 &&
                    laser.offsetLeft + 5 > enemyPosition.x &&
                    laser.offsetTop < enemyPosition.y + 30 &&
                    laser.offsetTop + 5 > enemyPosition.y
                ) {
                    enemy.health -= 20;
                    updateHealthBar(enemy, enemy.health);
                    if (enemy.health <= 0) {
                        enemy.element.remove();
                        enemies.splice(index, 1);
                    }
                    clearInterval(laserInterval);
                    laser.remove();
                }
            });

            if (boss) {
                const bossPosition = {
                    x: parseInt(boss.style.left),
                    y: parseInt(boss.style.top)
                };

                if (
                    laser.offsetLeft < bossPosition.x + 60 &&
                    laser.offsetLeft + 5 > bossPosition.x &&
                    laser.offsetTop < bossPosition.y + 60 &&
                    laser.offsetTop + 5 > bossPosition.y
                ) {
                    boss.health -= 20;
                    updateHealthBar({ healthBar: boss.children[0] }, boss.health);
                    if (boss.health <= 0) {
                        boss.remove();
                        boss = null;
                        displayVictoryModal(); // Affiche la modal de victoire
                    }
                    clearInterval(laserInterval);
                    laser.remove();
                }
            }

            if (laser.offsetTop < 0) {
                clearInterval(laserInterval);
                laser.remove();
            }
        }, 50);
    }

    function displayVictoryModal() {
        const modal = document.getElementById("victoryModal");
        modal.style.display = "block";
        window.location.replace("index.php");
        const closeBtn = document.getElementsByClassName("close")[0];
        closeBtn.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    function enemyShootLaser(enemy) {
        const laser = document.createElement('div');
        laser.className = 'laser';
        laser.style.left = parseInt(enemy.element.style.left) + 'px';
        laser.style.top = parseInt(enemy.element.style.top) + 'px';
        gameArea.appendChild(laser);

        const laserInterval = setInterval(() => {
            laser.style.top = laser.offsetTop + 5 + 'px'; // Déplace le laser uniquement vers le bas

            const playerPos = {
                x: parseInt(player.style.left),
                y: parseInt(player.style.bottom)
            };

            if (
                laser.offsetLeft < playerPos.x + 30 &&
                laser.offsetLeft + 5 > playerPos.x &&
                laser.offsetTop < playerPos.y + 30 &&
                laser.offsetTop + 5 > playerPos.y
            ) {
                playerHealth -= 10;
                updateHealthBar({ healthBar: playerHealthBar }, playerHealth);
                clearInterval(laserInterval);
                laser.remove();
                if (playerHealth <= 0) {
                    gameOver();
                }
            }

            if (laser.offsetTop > gameArea.offsetHeight) {
                clearInterval(laserInterval);
                laser.remove();
            }
        }, 50);
    }

    setInterval(() => {
        enemies.forEach(enemy => {
            if (enemy.hasExited) { // Vérifiez si l'ennemi a quitté l'écran avant de tirer
                enemyShootLaser(enemy);
            }
        });
        if (boss) enemyShootLaser({ element: boss });
    }, 2000);

    function gameLoop() {
        moveEnemies();
        moveBoss();
        updateHealthBar({ healthBar: playerHealthBar }, playerHealth);
        requestAnimationFrame(gameLoop);
    }

    updateHealthBar({ healthBar: playerHealthBar }, playerHealth);
    gameLoop();
     // Ajoutez des styles CSS pour les formes
     const styles = document.createElement('style');
     styles.innerHTML = `
         .player {
             width: 30px;
             height: 30px;
             position: absolute;
         }
         .circle {
             border-radius: 50%;
        
         }
         .square {
             /* Pas besoin de styles supplémentaires pour un carré */
         }
         .triangle {
             width: 0;
             height: 0;
             border-left: 15px solid transparent;
             border-right: 15px solid transparent;
             border-bottom: 30px solid; /* Couleur appliquée dynamiquement */
             background-color: transparent;
         }
     `;
     document.head.appendChild(styles);
});