export default class Ship {
    constructor(context, rotate) {
        this.ctx = context
        this.x = 0;
        this.y = 0;
        this.width = 25;
        this.height = 20;
        this.rotate = rotate ? rotate * Math.PI / 180 : 0;
        this.color = "#ffff00";
        this.showFlame = false;
    }

    draw() {
        // save()和restore()方法要一起使用才会有效果。
        let { ctx, rotate } = this

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(rotate);

        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000";
        ctx.beginPath();
        ctx.moveTo(10, 0);
        ctx.lineTo(-10, 10);
        ctx.lineTo(-5, 0);
        ctx.lineTo(-10, -10);
        ctx.lineTo(10, 0);
        ctx.stroke();

        if (this.showFlame) {
            ctx.beginPath();
            ctx.moveTo(-7.5, -5);
            ctx.lineTo(-15, 0);
            ctx.lineTo(-7.5, 5);
            ctx.fillStyle = "#ff0000";
            ctx.fill();
            ctx.stroke();
        }
        ctx.restore();
    }
}
