const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Ball class
class Ball {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = (Math.random() - 0.5) * 8; // Random horizontal velocity
        this.dy = (Math.random() - 0.5) * 8; // Random vertical velocity
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        // Bounce off walls
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        // Update position
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

// Create balls
const balls = [
    new Ball(100, 100, 20, 'red'),
    new Ball(200, 200, 20, 'blue'),
    new Ball(300, 300, 20, 'green'),
    new Ball(400, 400, 20, 'orange'),
    new Ball(500, 500, 20, 'white'),
    new Ball(150, 150, 20, 'green'),
    new Ball(250, 250, 20, 'green'),
    new Ball(350, 350, 20, 'green'),
    new Ball(450, 450, 20, 'green')
];

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    balls.forEach(ball => {
        ball.update();
    });

    requestAnimationFrame(animate);
}

// Start animation
animate();

// Cursor Trail Effect
function createTrail() {
    const dots = [];
    const numDots = 12;
    
    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'trail-dot';
        dot.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: #ff00ff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - (i / numDots)};
        `;
        document.body.appendChild(dot);
        dots.push({ element: dot, x: 0, y: 0 });
    }

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateTrail() {
        let x = mouseX;
        let y = mouseY;

        dots.forEach((dot, index) => {
            const nextDot = dots[index + 1] || dots[0];
            dot.x = x;
            dot.y = y;
            dot.element.style.left = `${x}px`;
            dot.element.style.top = `${y}px`;
            x += (nextDot.x - x) * 0.5;
            y += (nextDot.y - y) * 0.5;
        });
        requestAnimationFrame(updateTrail);
    }
    updateTrail();
}

// Status Bar Text
function scrollStatusText() {
    const text = "✨ Welcome to my awesome retro website! Thanks for visiting! ✨";
    let position = 0;
    
    setInterval(() => {
        window.status = text.substring(position) + text.substring(0, position);
        position = (position + 1) % text.length;
    }, 200);
}

// Random Welcome Alert
function showWelcomeMessage() {
    const messages = [
        "Welcome to my rad website!",
        "Thanks for stopping by!",
        "Hope you enjoy your stay!",
        "Don't forget to sign my guestbook!",
        "Best viewed in Internet Explorer! ;)"
    ];
    setTimeout(() => {
        alert(messages[Math.floor(Math.random() * messages.length)]);
    }, 2000);
}

// Falling Snow Effect
function createSnowflakes() {
    const numFlakes = 50;
    const snowContainer = document.createElement('div');
    snowContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1000;
    `;
    document.body.appendChild(snowContainer);

    for (let i = 0; i < numFlakes; i++) {
        const flake = document.createElement('div');
        flake.className = 'snowflake';
        flake.style.cssText = `
            position: absolute;
            color: #ffffff;
            font-size: ${Math.random() * 20 + 10}px;
            left: ${Math.random() * 100}%;
            animation: fall ${Math.random() * 5 + 5}s linear infinite;
        `;
        flake.innerHTML = '❄';
        snowContainer.appendChild(flake);
    }
}

// Hit Counter (Fake)
function updateHitCounter() {
    const counterElement = document.querySelector('.counter');
    if (counterElement) {
        const randomHits = Math.floor(Math.random() * 1000) + 5000;
        const hitCounterText = document.createElement('div');
        hitCounterText.textContent = `${randomHits}`;
        hitCounterText.style.cssText = `
            font-family: "Digital", monospace;
            font-size: 24px;
            color: #00ff00;
            text-shadow: 0 0 5px #00ff00;
            background-color: #000;
            padding: 5px 10px;
            border: 2px solid #00ff00;
            display: inline-block;
            margin-top: 10px;
        `;
        counterElement.appendChild(hitCounterText);
    }
}

// Initialize all effects
window.onload = function() {
    createTrail();
    scrollStatusText();
    showWelcomeMessage();
    createSnowflakes();
    updateHitCounter();
    
    // Add some CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            from { transform: translateY(-100vh); }
            to { transform: translateY(100vh); }
        }
    `;
    document.head.appendChild(style);
}; 