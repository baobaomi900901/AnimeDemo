const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

ctx.translate(0, canvas.height / 2);
ctx.scale(1, -1); // 翻转Y轴

for (let angle = 0; angle <= Math.PI *2; angle += 0.01) {
    var x = angle * 100,
        y = Math.sin(angle)*100;
        // console.log(x,y);
    ctx.beginPath();
    ctx.fillRect(x,y,5,5);
}

for (let angle = 0; angle <= Math.PI *2; angle += 0.01) {
    var x = angle * 100,
        y = Math.cos(angle)*100;
        // console.log(x,y);
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.fillRect(x,y,5,5);
}

for (let angle = 0; angle <= Math.PI; angle += 0.01) {
    var x = angle * 100,
        y = Math.tan(angle)*100;
        // console.log(x,y);
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.fillRect(x,y,5,5);
    console.log( Math.PI *2);
}



// sinθ/正弦:  对边/斜边;
// cosθ/余弦:  邻边/斜边
// tanθ/正切:  对边/邻边;