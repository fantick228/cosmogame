const gameArea = document.getElementById('game-area');
const astronaut = document.getElementById('astronaut');
const scoreDisplay = document.getElementById('score');

let score = 0;
let isGameOver = false;

// Ініціалізація початкових позицій космонавта
astronaut.style.top = '50%';
astronaut.style.left = '50%';

// Рух космонавта
document.addEventListener('keydown', (e) => {
  if (isGameOver) return;

  const rect = astronaut.getBoundingClientRect();
  const gameAreaRect = gameArea.getBoundingClientRect();

  switch (e.key) {
    case 'ArrowUp': // Рух вгору
      if (rect.top > gameAreaRect.top) {
        astronaut.style.top = `${parseFloat(astronaut.style.top) - 5}%`;
      }
      break;
    case 'ArrowDown': // Рух вниз
      if (rect.bottom < gameAreaRect.bottom) {
        astronaut.style.top = `${parseFloat(astronaut.style.top) + 5}%`;
      }
      break;
    case 'ArrowLeft': // Рух вліво
      if (rect.left > gameAreaRect.left) {
        astronaut.style.left = `${parseFloat(astronaut.style.left) - 5}%`;
      }
      break;
    case 'ArrowRight': // Рух вправо
      if (rect.right < gameAreaRect.right) {
        astronaut.style.left = `${parseFloat(astronaut.style.left) + 5}%`;
      }
      break;
  }

  checkStarCollision(); // Перевіряємо зіткнення з кожною зірочкою
});

// Створення зірки
function createStar() {
  if (isGameOver) return;

  const star = document.createElement('div');
  star.classList.add('star');

  let x = Math.random() * (gameArea.clientWidth - 30);
  let y = Math.random() * (gameArea.clientHeight - 30);

  star.style.left = `${x}px`;
  star.style.top = `${y}px`;

  gameArea.appendChild(star);

  // Видалення зірки через 5 секунд, якщо гравець її не зібрав
  setTimeout(() => {
    if (star.parentNode) {
      star.remove();
    }
  }, 5000);
}

// Перевірка зіткнення з кожною зірочкою
function checkStarCollision() {
  const stars = document.querySelectorAll('.star'); // Отримуємо всі зірки
  const astronautRect = astronaut.getBoundingClientRect();

  stars.forEach((star) => {
    const starRect = star.getBoundingClientRect();

    if (checkCollision(astronautRect, starRect)) {
      score++; // Збільшуємо очки
      scoreDisplay.textContent = score;
      star.remove(); // Видаляємо зірку
    }
  });
}

// Створення прибульця
function createAlien() {
  if (isGameOver) return;

  const alien = document.createElement('div');
  alien.classList.add('alien');

  let x = Math.random() * (gameArea.clientWidth - 50);
  let y = Math.random() * (gameArea.clientHeight - 50);

  alien.style.left = `${x}px`;
  alien.style.top = `${y}px`;

  gameArea.appendChild(alien);

  // Перевірка зіткнення з космонавтом
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

// Перевірка зіткнень між двома об'єктами
function checkCollision(rect1, rect2) {
  return !(
    rect1.top > rect2.bottom ||
    rect1.bottom < rect2.top ||
    rect1.left > rect2.right ||
    rect1.right < rect2.left
  );
}

// Запуск гри
function startGame() {
  isGameOver = false;
  score = 0;
  scoreDisplay.textContent = score;

  setInterval(createStar, 1000); // Зірки з'являються кожну секунду
  setInterval(createAlien, 3000); // Прибульці з'являються кожні 3 секунди
}

// Завершення гри
function endGame() {
  isGameOver = true;
  alert(`Гру завершено! Ви набрали ${score} очок.`);
  window.location.reload(); // Перезапуск гри
}

startGame();
