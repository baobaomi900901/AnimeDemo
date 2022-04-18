const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// 1.创建一个粒子容器
let particleArray = [];

// 2.创建一个粒子构造函数
function Particle(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
}

// 3.为粒子构造函数的原型链上添加绘制方法
Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
}

// 3.为粒子构造函数的原型链上添加更新方法
Particle.prototype.update = function () {
    // 粒子位置+ size 大于 canvas 宽高 or 粒子位置 - size 小于 0
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
        this.directionX = -this.directionX;
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
        this.directionY = -this.directionY;
    }

    // 7.粒子运动轨迹
    this.x += this.directionX;
    this.y += this.directionY;

    this.draw();
}

// 4. 创建一组粒子, 初始化
function init() {
    particleArray = [];
    for (let i = 0; i < 100; i++) {
        let size = Math.random() * 10;
        let x = Math.random() * (innerWidth - size * 2) + size; // 分布在 屏幕上
        let y = Math.random() * (innerHeight - size * 2) + size;
        let directionX = (Math.random() * 0.5) - 0.2;
        let directionY = (Math.random() * 0.5) - 0.2;
        let color = '#fff';

        // 添加粒子
        particleArray.push(new Particle(x, y, directionX, directionY, size, color));
    }

}

function animate() {
    requestAnimationFrame(animate); // 递归动画
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
    }
}

// 随机分布的粒子
init() // 初始化
animate()

// 改变窗口后重新初始化
window.addEventListener('resize', () => {
    console.log('resize');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // mouse.radius = (canvas.width / 80 * canvas.height / 80);
    init();
})