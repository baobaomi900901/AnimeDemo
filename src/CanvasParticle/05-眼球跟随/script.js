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
        let x = Math.cos(this.position) * this.moveRadius + canvas.width/2;
        let y = Math.sin(this.position) * this.moveRadius + canvas.height/2;

        let star = 4; // 外角数量
        let innerAngle = true // 有无内角, false 时, innerAngleDepth 无效
        let innerAngleDepth = 100 // 内切深度, 正整数, 值越大深度越深
        let shape = {
            reInnerAngle: innerAngle ? this.size/innerAngleDepth : this.size,
            reStar : innerAngle ? star : star/2
        }

        ctx.arc(x, y, this.moveRadius/10, 0, Math.PI * 2, false);

        // drawStar(x,y,shape.reStar, this.size, shape.reInnerAngle)
        ctx.closePath();
        // 填充
        ctx.fillStyle = 'gold';
        ctx.fill();

        // 描边
        // ctx.strokeStyle = 'blue';
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

        // particlesArray.push(new Particle(moveRadius, step, position, size));
    }
}

function animate() {
    requestAnimationFrame(animate);
    // ctx.fillStyle = 'rgba(25, 75, 198, 0.02)'; // alpha值越小, 拖影的长度越长
    // ctx.fillRect(0, 0, innerWidth, innerHeight); //  将屏幕填充成黑色

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
