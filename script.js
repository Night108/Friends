const quotes = [
  "“True friends are never apart, maybe in distance but never in heart.”",
  "“Good friends are like stars. You don't always see them, but you know they're always there.”",
  "“A real friend is one who walks in when the rest of the world walks out.”",
  "“Friendship is born at that moment when one person says to another: 'You too? I thought I was the only one.'”"
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
const sparkleCanvas = document.getElementById('sparkleCanvas');
const sparkleCtx = sparkleCanvas.getContext('2d');
let sparkles = [];

function resizeCanvas() {
  sparkleCanvas.width = window.innerWidth;
  sparkleCanvas.height = window.innerHeight;
  
  const crackerCanvas = document.getElementById('crackerCanvas');
  crackerCanvas.width = window.innerWidth;
  crackerCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createSparkle() {
  return {
    x: Math.random() * sparkleCanvas.width,
    y: Math.random() * sparkleCanvas.height,
    size: Math.random() * 2 + 1,
    opacity: Math.random(),
    speedY: Math.random() * 0.5 + 0.2
  };
}

for (let i = 0; i < 150; i++) {
  sparkles.push(createSparkle());
}

function drawSparkles() {
  sparkleCtx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);
  for (let sparkle of sparkles) {
    sparkleCtx.beginPath();
    sparkleCtx.arc(sparkle.x, sparkle.y, sparkle.size, 0, Math.PI * 2);
    sparkleCtx.fillStyle = `rgba(255,255,255,${sparkle.opacity})`;
    sparkleCtx.fill();
    sparkle.y += sparkle.speedY;
    if (sparkle.y > sparkleCanvas.height) {
      sparkle.y = 0;
      sparkle.x = Math.random() * sparkleCanvas.width;
    }
  }
  requestAnimationFrame(drawSparkles);
}
drawSparkles();

// 🎉 Cracker Burst Effect (automatic)
const crackerCanvas = document.getElementById('crackerCanvas');
const crackerCtx = crackerCanvas.getContext('2d');
let crackers = [];

function createCrackerBurst() {
  // Create 100-150 cracker particles in random positions
  const particleCount = Math.floor(Math.random() * 50) + 100;
  const burstX = Math.random() * crackerCanvas.width;
  const burstY = Math.random() * crackerCanvas.height * 0.6; // Keep bursts in upper part of screen
  
  for (let i = 0; i < particleCount; i++) {
    crackers.push({
      x: burstX,
      y: burstY,
      size: Math.random() * 8 + 4,
      color: getRandomColor(),
      speedX: Math.random() * 10 - 5,
      speedY: Math.random() * -15 - 5,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 10 - 5,
      life: 100,
      decay: Math.random() * 0.5 + 0.5
    });
  }
  
  // Play celebration sound 50% of the time
  if (Math.random() > 0.5) {
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-happy-pop-2060.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => console.log("Audio playback prevented:", e));
  }
}

function getRandomColor() {
  const colors = [
    '#FF5252', '#FF4081', '#E040FB', '#7C4DFF', 
    '#536DFE', '#448AFF', '#40C4FF', '#18FFFF', 
    '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41', 
    '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function drawCrackers() {
  crackerCtx.clearRect(0, 0, crackerCanvas.width, crackerCanvas.height);
  
  for (let i = crackers.length - 1; i >= 0; i--) {
    const c = crackers[i];
    
    crackerCtx.save();
    crackerCtx.translate(c.x, c.y);
    crackerCtx.rotate(c.rotation * Math.PI / 180);
    
    // Draw cracker particle
    crackerCtx.fillStyle = c.color;
    crackerCtx.globalAlpha = c.life / 100;
    crackerCtx.fillRect(-c.size/2, -c.size/2, c.size, c.size);
    
    crackerCtx.restore();
    
    // Update position and rotation
    c.x += c.speedX;
    c.y += c.speedY;
    c.rotation += c.rotationSpeed;
    c.speedY += 0.1; // Gravity effect
    c.life -= c.decay;
    
    // Remove if life is over
    if (c.life <= 0) {
      crackers.splice(i, 1);
    }
  }
  
  requestAnimationFrame(drawCrackers);
}
drawCrackers();

// Automatic cracker bursts at random intervals
function scheduleNextBurst() {
  const delay = Math.random() * 1000 + 500; // 0.5-1.5 seconds between bursts
  setTimeout(() => {
    createCrackerBurst();
    scheduleNextBurst();
  }, delay);
}

// Initial bursts
setTimeout(() => {
  createCrackerBurst(); // First burst after 1 second
  scheduleNextBurst(); // Start the recurring bursts
}, 1000);
