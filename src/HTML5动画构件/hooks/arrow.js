export default class Arrow {
    constructor(context, rotate) {
        this.ctx = context
        this.x = 0;
        this.y = 0;
        this.rotate = rotate ? rotate * Math.PI / 180 : 0;
        this.color = "#ffff00";
    }

    draw() {
        // save()和restore()方法要一起使用才会有效果。
        let { ctx, rotate } = this

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(rotate);

        ctx.lineWidth = 2;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(-50, -25);
        ctx.lineTo(0, -25);
        ctx.lineTo(0, -50);
        ctx.lineTo(50, 0);
        ctx.lineTo(0, 50);
        ctx.lineTo(0, 25);
        ctx.lineTo(-50, 25);
        ctx.lineTo(-50, -25);
        ctx.closePath();

        ctx.fill(); // 填充着色
        ctx.stroke(); // 描边着色
        ctx.restore(); // 恢复之前保存的状态
    }
}
