const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// 1.创建一个粒子容器
let particles = [];

// 鼠标属性
const mouse = {
    x: undefined,
    y: undefined,
    radius: 100, // 鼠标影响预设区域
    // radius: canvas.width / 80 * canvas.height / 80,
}

// 获取鼠标位置
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
})

// 2.创建一个粒子构造函数
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
        // this.initMoveDirection = Math.random() > 0.5 ? true : false
    }

    // 3.给粒子构造函数添加一个绘制方法,
    draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    // 4.给粒子构造函数添加一个更新方法
    update = () => {

        // 判断粒子是否超出边界
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.directionY = -this.directionY;
        }

        // 检测鼠标是否在粒子范围内
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius + this.size) {
            // 边缘缓冲
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.directionX = -this.directionX;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.directionY = -this.directionY;
            }
        }


        this.x -= this.directionX;
        this.y -= this.directionY;
        // 重绘粒子
        this.draw()
    }
}

function connter() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            // 距离
            let distance = Math.pow((particles[a].x - particles[b].x), 2) + Math.pow((particles[a].y - particles[b].y), 2);
            if (distance < (canvas.width / 5) * (canvas.height / 5)) {
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }

}

function init() {
    // 创建粒子
    particles = [];
    // 粒子数量
    let numberOfParticles = canvas.width * canvas.height / 5000;
    // let numberOfParticles = 1
    for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 3 + 1;
        let x = Math.random() * ((innerWidth - size * 2) - size * 2) + size * 2;
        let y = Math.random() * ((innerHeight - size * 2) - size * 2) + size * 2;
        let directionX = Math.random() * 0.8 - 0.2;
        let directionY = Math.random() * 0.8 - 0.2;
        let color = 'black';
        particles.push(new Particle(x, y, directionX, directionY, size, color));
    }
}


// 递归动画
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
    }
    connter()
    // console.log(particles[0].bbm);
}
init()
animate()


window.addEventListener('resize', () => {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    init()
})