document.addEventListener('DOMContentLoaded', function() {
    const player = document.createElement('div');
    player.className = 'player';
    document.getElementById('game').appendChild(player);
  
    const enemy = document.createElement('div');
    enemy.className = 'enemy';
    document.getElementById('game').appendChild(enemy);
  });
  
  let playerPosition = { x: 50, y: 50 };
  
  document.addEventListener('keydown', function(e) {
    const player = document.querySelector('.player');
    switch(e.key) {
      case 'ArrowUp': playerPosition.y -= 10; break;
      case 'ArrowDown': playerPosition.y += 10; break;
      case 'ArrowLeft': playerPosition.x -= 10; break;
      case 'ArrowRight': playerPosition.x += 10; break;
    }
    player.style.left = playerPosition.x + 'px';
    player.style.top = playerPosition.y + 'px';
  });