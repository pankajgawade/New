// Floating Heart Animation
const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");
let w, h, hearts = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

class Heart {
  constructor() {
    this.x = Math.random() * w;
    this.y = h + 10;
    this.size = 10 + Math.random() * 15;
    this.speed = 1 + Math.random() * 2;
    this.alpha = 1;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = "hotpink";
    ctx.beginPath();
    ctx.arc(this.x - this.size / 2, this.y, this.size / 2, 0, Math.PI * 2);
    ctx.arc(this.x + this.size / 2, this.y, this.size / 2, 0, Math.PI * 2);
    ctx.lineTo(this.x, this.y + this.size);
    ctx.fill();
    ctx.restore();
  }
  update() {
    this.y -= this.speed;
    this.alpha -= 0.005;
  }
}

function animate() {
  ctx.clearRect(0, 0, w, h);
  if (Math.random() < 0.1) hearts.push(new Heart());
  hearts.forEach((heart, i) => {
    heart.draw();
    heart.update();
    if (heart.alpha <= 0) hearts.splice(i, 1);
  });
  requestAnimationFrame(animate);
}
animate();

// Typewriter Effect
const txt = `Hi Myyy Nikkuuuu babyyy 💖💫

This page is not just a surprise...
it's our forever space 💖
From your smile to your cuteness, from your voice to your anger 
I love every single thing about you.
You're my peace, my home, my babygirl.
Just want to say... I LOVE YOU, BABYY 🥺💞
Forever. Always. Till the stars fade ✨`;
let i = 0;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("typewriter").innerHTML +=
      txt.charAt(i) === "\n" ? "<br>" : txt.charAt(i);
    i++;
    setTimeout(typeWriter, 40);
  }
}
typeWriter();

// Popup Functions
function revealSurprise() {
  document.getElementById("popup").classList.add("show");
}
function closePopup() {
  document.getElementById("popup").classList.remove("show");
}
