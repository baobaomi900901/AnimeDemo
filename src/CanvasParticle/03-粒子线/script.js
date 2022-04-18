const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// 1.创建一个粒子容器
let particlesArray = [];
const colors = [
    'blue',
];

// 2.鼠标属性
const mouse = {
    x: undefined,
    y: undefined,
    // radius: 100, // 鼠标影响预设区域
    radius: canvas.width / 80 * canvas.height / 80,
}


// 3.获取鼠标位置
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
})

// 4.创建一个粒子class
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    // 绘制粒子方法
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    // 更新粒子方法
    update() {
        // 检查粒子是否在画布中, 如果不在就做反方向运动
        if (this.x >= canvas.width || this.x <= 0) {
            this.directionX = -this.directionX;
        }
        if (this.y >= canvas.height || this.y <= 0) {
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

        // 粒子方向
        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
    }
}

// 初始化粒子
function init() {
    // 创建粒子
    particlesArray = [];
    // 粒子数量, 根据屏幕尺寸设置粒子数量
    let numberOfParticles = canvas.width * canvas.height / 5000;
    // console.log(canvas.width * canvas.height / 9000);
    for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 3 + 1;
        let x = Math.random() * ((innerWidth - size * 2) - size * 2) + size * 2;
        let y = Math.random() * ((innerHeight - size * 2) - size * 2) + size * 2;
        let directionX = (Math.random() - .5) - .5;
        let directionY = (Math.random() - .5) - .5;
        let color = 'black';
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

function connect() {
    // 连接粒子需要一个起始坐标, 一个结束坐标
    // 例: 0 和 1, 1 和 2, 2 和 3.... 计算完的坐标距离去比较屏幕中心点
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width / 5) * (canvas.height / 5)) {
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }

    }
}

init()
animate()

// console.log('particlesArray :>> ', particlesArray);

window.addEventListener('resize', () => {
    console.log('resize');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    mouse.radius = (canvas.width / 80 * canvas.height / 80);
    init();
})


window.addEventListener('mouseout', () => {
    let interval = setInterval(() => {
        console.log('setInterval');
        mouse.x = undefined;
        mouse.y = undefined;
        clearInterval(interval);
    }, 100);
})