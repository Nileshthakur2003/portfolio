function changePageTrackerStatus()
{
    document.getElementById("scrollTracker").width+=2;
}
function showMenu()
{
  var target = document.getElementById("menu");
  if(target.style.display == "none"){
    document.getElementById("menu").style.display = 'flex';
  }else{
    document.getElementById("menu").style.display = 'none';
  }
}


document.addEventListener('DOMContentLoaded', () => {
const particles = [];
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let particleCount = 100;
let backgroundColor = "black";
let normalRadius = 3;
let increasedRadius = 6;
let shadowBlur = 5; // Shadow blur value
let twinklingProbability = 0.02; // Probability of a particle twinkling in each frame

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor(x, y, radius, color, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.opacity = 1; // Initial opacity
        this.twinkle = Math.random() < twinklingProbability; // Randomly set if particle twinkles
        this.setVibrations = false;
    }

    getRandomValue(){
      return (Math.random()*10>5)?1:-1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.shadowBlur = shadowBlur;
        ctx.shadowColor = 'white'; // Shadow color
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.speed+((this.setVibrations)?this.getRandomValue():0);
        this.y += this.speed+((this.setVibrations)?this.getRandomValue():0);
        if (this.x > canvas.width + this.radius || this.x < -this.radius) {
            this.speed = -this.speed;
        }
        if (this.y > canvas.height + this.radius || this.y < -this.radius) {
            this.speed = -this.speed;
        }

        // Randomly change opacity for twinkling effect
        if (this.twinkle && Math.random() < twinklingProbability) {
            this.opacity = Math.random();
        } else {
            this.opacity = 1;
        }
    }

    increaseSize() {
        this.radius = increasedRadius;
    }

    resetSize() {
        this.radius = normalRadius;
    }
}

function init() {
    for (let i = 0; i < particleCount; i++) {
        const radius = normalRadius;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`;
        const speed = (Math.random() - 0.5) * 2; // random speed between -1 and 1
        particles.push(new Particle(x, y, radius, color, speed));
    }
}

function animate() {
    requestAnimationFrame(animate);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
}

function increaseSizeForAllParticles() {
    particles.forEach(particle => {
        particle.increaseSize();
    });
}

function resetSizeForAllParticles() {
    particles.forEach(particle => {
        particle.resetSize();
    });
}

function setParticleVibrations(){
  particles.forEach(particle=>{
    particle.setVibrations = true;
  })
}

function resetParticleVibrations(){
  particles.forEach(particle=>{
    particle.setVibrations = false;
  })
}



document.addEventListener('keydown', (event) => {
    if (event.key === ' ') { // Check if spacebar is pressed
        increaseSizeForAllParticles();
    }else if(event.key === 'n'){
      setParticleVibrations();
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === ' ') { // Check if spacebar is released
        resetSizeForAllParticles();
    }else if(event.key === 'n'){
      resetParticleVibrations();
    }
});

init();
animate();
});