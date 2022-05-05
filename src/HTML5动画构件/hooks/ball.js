import Utils from './utils.js';
const utils = new Utils();

export default class Ball {
    constructor(context, radius, color) {
        if (radius === undefined) { radius = 40; }
        if (color === undefined) { color = "#ff0000"; }
        this.ctx = context
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.radius = radius;
        this.rotation = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.color = utils.parseColor(color);
        this.lineWidth = 1;
    }

    draw() {
        let { ctx } = this
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.scale(this.scaleX, this.scaleY);

        ctx.lineWidth = this.lineWidth;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        //x, y, radius, start_angle, end_angle, anti-clockwise
        ctx.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
        ctx.closePath();
        ctx.fill();
        if (this.lineWidth > 0) {
            ctx.stroke();
        }
        ctx.restore();
    }

    // 返回圆心坐标
    getBounds() {
        return {
            // 圆形, 中心点为原始坐标
            x: this.x - this.radius,
            y: this.y - this.radius,
            width: this.radius * 2,
            height: this.radius * 2
        }
    }
}

