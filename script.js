const gameArea = document.getElementById('game-area');
const astronaut = document.getElementById('astronaut');
const scoreDisplay = document.getElementById('score');

let score = 0;
let isGameOver = false;

// Инициализация начальных позиций космонавта
astronaut.style.top = '50%';
astronaut.style.left = '50%';

// Движение космонавта
document.addEventListener('keydown', (e) => {
  if (isGameOver) return;

  const rect = astronaut.getBoundingClientRect();
  const gameAreaRect = gameArea.getBoundingClientRect();

  switch (e.key) {
    case 'ArrowUp':
      if (rect.top > gameAreaRect.top) {
        astronaut.style.top = `${parseFloat(astronaut.style.top) - 5}%`;
      }
      break;
    case 'ArrowDown':
      if (rect.bottom < gameAreaRect.bottom) {
        astronaut.style.top = `${parseFloat(astronaut.style.top) + 5}%`;
      }
      break;
    case 'ArrowLeft':
      if (rect.left > gameAreaRect.left) {
        astronaut.style.left = `${parseFloat(astronaut.style.left) - 5}%`;
      }
      break;
    case 'ArrowRight':
      if (rect.right < gameAreaRect.right) {
        astronaut.style.left = `${parseFloat(astronaut.style.left) + 5}%`;
      }
      break;
  }

  checkStarCollision(); // Проверяем столкновения с каждой звёздочкой
});

// Создание звезды
function createStar() {
  if (isGameOver) return;

  const star = document.createElement('div');
  star.classList.add('star');

  let x = Math.random() * (gameArea.clientWidth - 30);
  let y = Math.random() * (gameArea.clientHeight - 30);

  star.style.left = `${x}px`;
  star.style.top = `${y}px`;

  gameArea.appendChild(star);

  // Удаление звезды через 5 секунд, если игрок её не собрал
  setTimeout(() => {
    if (star.parentNode) {
      star.remove();
    }
  }, 5000);
}

// Проверка столкновения с каждой звёздочкой
function checkStarCollision() {
  const stars = document.querySelectorAll('.star'); // Получаем все звёзды
  const astronautRect = astronaut.getBoundingClientRect();

  stars.forEach((star) => {
    const starRect = star.getBoundingClientRect();

    if (checkCollision(astronautRect, starRect)) {
      score++; // Увеличиваем очки
      scoreDisplay.textContent = score;
      star.remove(); // Удаляем звезду
    }
  });
}

// Создание инопланетянина
function createAlien() {
  if (isGameOver) return;

  const alien = document.createElement('div');
  alien.classList.add('alien');

  let x = Math.random() * (gameArea.clientWidth - 50);
  let y = Math.random() * (gameArea.clientHeight - 50);

  alien.style.left = `${x}px`;
  alien.style.top = `${y}px`;

  gameArea.appendChild(alien);

  // Проверка столкновения с космонавтом
  const moveInterval = setInterval(() => {
    if (isGameOver) {
      clearInterval(moveInterval);
      return;
    }

    const astronautRect = astronaut.getBoundingClientRect();
    const alienRect = alien.getBoundingClientRect();

    if (checkCollision(astronautRect, alienRect)) {
      endGame();
      clearInterval(moveInterval);
    }
  }, 50);
}

// Проверка столкновений между двумя объектами
function checkCollision(rect1, rect2) {
  return !(
    rect1.top > rect2.bottom ||
    rect1.bottom < rect2.top ||
    rect1.left > rect2.right ||
    rect1.right < rect2.left
  );
}

// Запуск игры
function startGame() {
  isGameOver = false;
  score = 0;
  scoreDisplay.textContent = score;

  setInterval(createStar, 1000); // Звёзды появляются каждую секунду
  setInterval(createAlien, 3000); // Инопланетяне появляются каждые 3 секунды
}

// Завершение игры
function endGame() {
  isGameOver = true;
  alert(`Игра окончена! Вы набрали ${score} очков.`);
  window.location.reload(); // Перезапуск игры
}

startGame();
