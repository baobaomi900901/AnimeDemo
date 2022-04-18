const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');
width = ctx.canvas.width = window.innerWidth;
height = ctx.canvas.height = window.innerHeight;

// ctx.translate(0, canvas.height / 2);
// ctx.scale(1, -1); // 翻转Y轴

var centerY = height * .5,
    centerX = width * .5,
    // 偏移
    // offset =  height * .4, 
    // 速度
    speed = 0.1,
    // 起始角度
    angle = 0 ,
    baseRadius = 100
    offset =  50, 

    animation()

function animation() {
    // var y = centerY + Math.sin(angle) * offset;
    var radius = baseRadius + Math.sin(angle) * offset;

    // console.log(radius);

    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius,0,Math.PI*2,false);
    ctx.fill()

    angle += speed;

    requestAnimationFrame(animation)
    
}

let arr = [1,2,3,4]

console.log('arr :>> ', arr);

let arr2 = []
arr.reduce((pre,cur) =>{
    arr2.push({a:pre})
    return cur
})

console.log(arr2);


// cosθ/正弦:  对边/斜边;
// cosθ/余弦:  邻边/斜边; 
//   cos 0 == 1
// tanθ/正切:  对边/邻边; 