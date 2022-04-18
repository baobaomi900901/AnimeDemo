const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// 1.创建一个粒子容器
let particlesArray = [];
const colors = [
    'blue',
];


// 2.创建一个粒子class
class Particle {
    constructor(moveRadius, step, position, size, color) {
        this.moveRadius = moveRadius; // 移动半径
        this.step = step; // 节奏
        this.position = position; // 初始位置
        this.size = size;
        this.color = color;
    }
    // 绘制粒子方法
    draw() {
        ctx.beginPath();
        ctx.arc(Math.cos(this.position) * this.moveRadius + canvas.width/2, 
        Math.sin(this.position) * this.moveRadius + canvas.height/2, 
        this.size, 0, Math.PI * 2, false);
        ctx.closePath();
        // 填充
        ctx.fillStyle = '#fff';
        ctx.fill();

        // 描边
        // ctx.strokeStyle = '#fff';
        // ctx.stroke();
    }
    // 更新粒子方法
    update() {
        this.position += this.step;

        this.draw();
    }
}

// 初始化粒子
function init() {
    // 创建粒子
    particlesArray = [];
    for (let i = 0; i < 500; i++) {
        let moveRadius = Math.random() * canvas.width;
        let step = (Math.random()*0.002) + 0.002;
        let position = Math.random() * Math.PI * 2;
        let size = Math.random() * 8 + 3;

        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        let a = Math.random()+0.1;
        let color = `rgba(${r}, ${g}, ${b}, ${a})`;


        particlesArray.push(new Particle(moveRadius, step, position, size));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.02)'; // alpha值越小, 拖影的长度越长
    ctx.fillRect(0, 0, innerWidth, innerHeight); //  将屏幕填充成黑色

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
} 


init() 
animate()

// 屏幕尺寸改变时重置canvas尺寸 与 粒子初始化
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    mouse.radius = (canvas.width / 80 * canvas.height / 80);
    init();
})
