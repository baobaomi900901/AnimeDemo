const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

const mouse = {
    x: null,
    y: null,
    radius: 1, // 鼠标影响预设区域
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;

    let dx = mouse.x - 100; // this.x
    let dy = mouse.y - 100; // this.y
    let distance = Math.sqrt(dx * dx + dy * dy);
    // let distance2 = ;

    // // 圆形判断
    // if (distance < mouse.radius + 50) {
    //     console.log(mouse);
    // }


    let distance2X = 100 + 0; // this.x
    let distance2Y = 100 + 0; // this.y

    // 方形判断, 50 是 this.size
    if (mouse.x >=distance2X && mouse.x <= distance2X + 50 && mouse.y >= distance2X && mouse.y <= distance2X + 50){
        console.log(mouse);
    }
        
    
})

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
    // ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.rect(this.x, this.y, this.size, this.size);
    ctx.fillStyle = this.color;
    ctx.fill();
}

// 4.声明第一个粒子, 此时偏移 X & Y 还没用到, 不用管他
const particles = new Particle(100, 100, 1, 1, 50, '#fff');

//  5.绘制第一个粒子
particles.draw();

window.addEventListener('resize', function () {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    particles.draw();
})