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

// 4.声明第一个粒子, 此时偏移 X & Y 还没用到, 不用管他
const particles = new Particle(100, 100, 1, 1, 10, '#fff');

//  5.绘制第一个粒子
particles.draw();