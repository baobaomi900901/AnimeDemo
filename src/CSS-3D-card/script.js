// DOM Element selections
const cardWrapper = document.querySelector(".cardWrapper");
const card = document.querySelector(".card");
const highlight = document.querySelector(".highlight");

// 偏移角度
const mostX = 10; // 10 or -10
const mostY = 10; // 10 or -10

cardWrapper.addEventListener("click", (e) => {
    console.log(1);
})

cardWrapper.addEventListener("mousemove", (e) => {
    console.log(cardWrapper);
    // 初始化
    card.style.transition = "none";
    highlight.style.transition = "none";

    const x = e.offsetX;
    const y = e.offsetY;
    // el.getBoundingClientRect() 返回元素的位置和大小
    const { width, height } = cardWrapper.getBoundingClientRect();
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    console.log(halfWidth, halfHeight);

    // 计算角度, 这里的 y 是相反的
    const rotationY = ((x - halfWidth) / halfWidth) * mostX;
    const rotationX = ((y - halfHeight) / halfHeight) * mostY * -1;


    // 设置偏移
    card.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
    highlight.style.left = `${(rotationY / mostX) * 30 * -1}%`;
    highlight.style.top = `${(rotationX / mostY) * 30}%`;
});

cardWrapper.addEventListener("mouseout", () => {
    // 回归属性
    card.style.transition = "transform 0.5s ease-in-out";
    card.style.transform = `rotateY(0) rotateX(0)`;
    highlight.style.transition = "left 0.5s ease-in-out, top 0.5s ease-in-out";

    // 回归属性
    highlight.style.left = `0%`;
    highlight.style.top = `0%`;
});
