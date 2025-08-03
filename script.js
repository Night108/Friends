const quotes = [
  "“True friends are never apart, maybe in distance but never in heart.”",
  "“Good friends are like stars. You don’t always see them, but you know they’re always there.”",
  "“A real friend is one who walks in when the rest of the world walks out.”",
  "“Friendship is born at that moment when one person says to another: ‘You too? I thought I was the only one.’”"
];

let quoteIndex = 0;

function showNextQuote() {
  const display = document.getElementById("quoteDisplay");
  display.innerText = quotes[quoteIndex];
  display.style.animation = "none";
  display.offsetHeight;
  display.style.animation = null;
  quoteIndex = (quoteIndex + 1) % quotes.length;
}

// ✨ Sparkles with Canvas
const canvas = document.getElementById('sparkleCanvas');
const ctx = canvas.getContext('2d');
let sparkles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createSparkle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 1,
    opacity: Math.random(),
    speedY: Math.random() * 0.5 + 0.2
  };
}

for (let i = 0; i < 150; i++) {
  sparkles.push(createSparkle());
}

function drawSparkles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let sparkle of sparkles) {
    ctx.beginPath();
    ctx.arc(sparkle.x, sparkle.y, sparkle.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${sparkle.opacity})`;
    ctx.fill();
    sparkle.y += sparkle.speedY;
    if (sparkle.y > canvas.height) {
      sparkle.y = 0;
      sparkle.x = Math.random() * canvas.width;
    }
  }
  requestAnimationFrame(drawSparkles);
}
drawSparkles();
