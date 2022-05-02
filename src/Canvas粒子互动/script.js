const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 304;
canvas.height = 304;

// 粒子
let particleArray = [];

// 鼠标坐标
let mouse = {
    x: null,
    y: null,
    radius: 50
}

// 获取鼠标坐标
canvas.addEventListener('mousemove', function (event) { // 鼠标移动
    mouse.x = event.x;
    mouse.y = event.y;

    console.log('mouse.x,mouse.y :>> ', mouse.x, mouse.y);
    // console.log('mouse.x, mouse.y :>> ', mouse.x, mouse.y, canvas.clientLeft / 2, canvas.clientTop / 2);
})

canvas.addEventListener('mouseout', function (event) { // 鼠标移出
    mouse.x = null;
    mouse.y = null;
})
function drawImage() {
    let imageWidth = png.width;
    let imageHeight = png.height;

    const data = ctx.getImageData(0, 0, imageWidth, imageHeight);

    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    class Particle {
        constructor(x, y, color, size) {
            // this.x = x + canvas.width / 2 - png.width * 2;
            // this.y = y + canvas.height / 2 - png.height * 2;
            this.x = x;
            this.y = y;
            this.color = color;
            this.size = 1;
            // this.baseX = x + canvas.width / 2 - png.width * 2;
            // this.baseY = y + canvas.height / 2 - png.height * 2;
            this.baseX = x
            this.baseY = y
            // friction
            this.density = Math.random() * 10 + 1;
        }
        // 粒子绘制方法
        draw() {
            ctx.beginPath();
            // ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.strokeRect(this.x, this.y, this.size, this.size); // 矩形粒子
            ctx.fill();
            ctx.closePath();
        }
        // 粒子更新方法
        update() {
            ctx.fillStyle = this.color
            ctx.strokeStyle = this.color


            // 碰撞检测
            // let deltaX = mouse.x - this.x;
            // let deltaY = mouse.y - this.y;
            let deltaX = mouse.x - this.x;
            let deltaY = mouse.y - this.y;


            let distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)); // 平方
            // 粒子飞散朝向
            let forceDirectionX = deltaX / 2;
            let forceDirectionY = deltaY / 2;

            // 初始化, 粒子飞散朝向归 0
            if (mouse.x == null || mouse.y == null) {
                forceDirectionX = 0;
                forceDirectionY = 0
            }

            // 粒子飞散距离
            const maxDistance = 100;
            let force = (maxDistance - distance) / maxDistance;
            if (force < 0) {
                force = 0;
            }

            // 粒子飞散坐标
            let directionX = forceDirectionX * force * this.density * 0.6;
            let directionY = forceDirectionY * force * this.density * 0.6;

            if (distance < mouse.radius + this.size) {
                this.x -= directionX / distance;
                this.y -= directionY / distance;
            } else {
                if (this.x !== this.baseX) {
                    // deltaX
                    let dx = this.x - this.baseX;
                    this.x -= dx * 0.2;
                }
                if (this.y !== this.baseY) {
                    // deltaY
                    let deltaY = this.y - this.baseY;
                    this.y -= deltaY * 0.2;
                }
            }
            this.draw();
        }
    }

    function init() {
        particleArray = [];
        let xt = true;
        let yt = true;
        let xtt = 0;
        let ytt = 0;
        for (let y = 0, y2 = data.height; y < y2; y++) {
            // 像素化
            if (ytt < 4) {
                ytt++
            } else {
                ytt = 0;
                yt = !yt;
            }
            for (let x = 0, x2 = data.width; x < x2; x++) {
                if (data.data[y * 4 * data.width + x * 4 + 3] > 152) {
                    let positionX = x;
                    let positionY = y;
                    let red = data.data[y * 4 * data.width + x * 4];
                    let green = data.data[y * 4 * data.width + x * 4 + 1];
                    let blue = data.data[y * 4 * data.width + x * 4 + 2];
                    // 像素化
                    if (xtt < 4) {
                        xtt++;
                    } else {
                        xtt = 1;
                        xt = !xt;
                    }
                    let alpha = xt && yt ? 1 : 0.0;
                    // console.log('xt, yt :>> ', xt, yt);
                    let color = 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
                    particleArray.push(new Particle(positionX, positionY, color, 2));
                }
            }
        }
        // console.log('particleArray :>> ', particleArray);
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].update();
        }
    }
    init();
    animate();

    window.addEventListener('resize', function () {
        // canvas.width = window.innerWidth;
        // canvas.height = window.innerHeight;
        init();
    })
}

const png = new Image();
// png/jpg to base64
png.src = "data:image/png;base64,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"
window.addEventListener('load', function () {
    console.log('load');
    ctx.drawImage(png, 0, 0)
    drawImage();
})
