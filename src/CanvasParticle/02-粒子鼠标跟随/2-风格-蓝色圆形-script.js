const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// 1.创建一个粒子容器
let particleArray = [];
const colors = [
    'blue',
];

// 2.鼠标接触时使用
const maxSize = 40;
const minSize = 0;
const mouseRadius = 60;

// 3.鼠标初始化位置
const mouse = {
    x: null,
    y: null,
}

// 4.获取鼠标位置
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
})

// 5.创建一个粒子构造函数
function Particle(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
}

// 6.为粒子构造函数的原型链上添加绘制方法
Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
}

// 7.为粒子构造函数的原型链上添加更新方法
Particle.prototype.update = function () {
    // 粒子位置+ size 大于 canvas 宽高 or 粒子位置 - size 小于 0
    if (this.x + this.size * 2 > canvas.width || this.x - this.size * 2 < 0) {
        this.directionX = -this.directionX;
    }
    if (this.y + this.size * 2 > canvas.height || this.y - this.size * 2 < 0) {
        this.directionY = -this.directionY;
    }

    // 8.粒子运动轨迹
    this.x += this.directionX;
    this.y += this.directionY;

    // 9.鼠标交互, 判断粒子离我们的鼠标是否足够近

    //    鼠标坐标 - 粒子大小 < 鼠标影响预设区域 
    // && 鼠标坐标 - 粒子大小 > - 鼠标影响预设区域, 则执行放大动画
    if (mouse.x - this.x < mouseRadius && mouse.x - this.x > -mouseRadius && mouse.y - this.y < mouseRadius && mouse.y - this.y > -mouseRadius) {
        // 如果粒子小于粒子最大尺寸, 则放大
        if (this.size < maxSize) {
            this.size += 1;
        }
    } else if (this.size > minSize) { // maxSize : 如果粒子大于粒子最大尺寸, 则缩小
        this.size -= 0.1;
    }
    // 如果尺寸小于 0 则执行等于 0
    if (this.size < 0) {
        this.size = 0;
    }

    // 初始化, 粒子大小归 0
    if (mouse.x === null || mouse.y === null) {
        this.size = 0;
    }

    this.draw();
}

// 10. 创建一组粒子, 初始化
function init() {
    particleArray = [];
    for (let i = 0; i < 1000; i++) {
        let size = 0;
        // 分布在 屏幕上
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * .2) - .1;
        let directionY = (Math.random() * .2) - .1;
        let color = colors[Math.floor(Math.random() * colors.length)];

        // 添加粒子
        particleArray.push(new Particle(x, y, directionX, directionY, size, color));
    }

}

function animate() {
    let anime = requestAnimationFrame(animate); // 递归帧动画
    ctx.clearRect(0, 0, innerWidth, innerHeight); //每次递归前清除画布
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
    }
}

// 随机分布的粒子
init() // 初始化
animate()



// 改变窗口后重新初始化
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
    // animate()
})

// 让粒子在角落消失
setInterval(() => {
    console.log('setInterval');
    mouse.x = undefined;
    mouse.y = undefined;
}, 1000);

