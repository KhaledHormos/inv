const card = document.getElementById('weddingCard');
const cover = document.getElementById('cover');
const inner = document.getElementById('inner');
const music = document.getElementById('weddingMusic');
const openBtn = document.getElementById('openBtn');

// Fireworks Canvas
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = Math.random() * 6 + 2;
    this.speedX = Math.random() * 5 - 2.5;
    this.speedY = Math.random() * 5 - 3;
    this.gravity = 0.08;
    this.life = 80;
  }

  update() {
    this.speedY += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function createFirework(x, y) {
  const colors = ['#ffd700', '#ff69b4', '#00ffff', '#ff4500', '#ffffff'];
  for (let i = 0; i < 80; i++) {
    particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
  }
}

function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].life <= 0) particles.splice(i, 1);
  }
  requestAnimationFrame(animateFireworks);
}

// Open Card
openBtn.addEventListener('click', () => {
  card.classList.add('open');
  
  // Play Music
  music.play().catch(() => console.log("Music autoplay prevented"));
  
  // Fireworks
  createFirework(window.innerWidth/2, window.innerHeight/3);
  setTimeout(() => createFirework(window.innerWidth/3, window.innerHeight/2.5), 300);
  setTimeout(() => createFirework(2*window.innerWidth/3, window.innerHeight/2.2), 600);
  
  // More fireworks
  setInterval(() => {
    if (Math.random() > 0.6) createFirework(Math.random() * canvas.width, Math.random() * canvas.height * 0.6);
  }, 800);
});

animateFireworks();

// Responsive canvas
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function rsvp() {
  alert("Thank you! 🎉\n\nPlease contact the couple directly to confirm your attendance.");
}