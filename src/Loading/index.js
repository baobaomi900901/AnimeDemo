import gsap from "../../node_modules/gsap/index.js";
import CSSRulePlugin from "../../node_modules/gsap/CSSRulePlugin.js";

// 获取伪元素的插件
gsap.registerPlugin(CSSRulePlugin);

let container = document.querySelector(".container");
let style = document.querySelector("style");

// 原点数量
let point = 20;
// 倾斜角度
let deg = 360 / point

//  自定义模板. 添加伪元素
let spansBofore = []

for (let i = 1; i <= point; i++) {
    let spans = document.createElement("span");
    spans.classList.add("span", "span" + i);
    container.appendChild(spans);
    // 写入一个伪类, 用于 CSSRulePlugin 去获取伪元素
    spansBofore += `.span${i}:before {
        content: "";
    }
    `
}

// 将伪元素样式加入style
style.innerHTML += spansBofore;

// 申明伪元素对象组
let rules = []
for (let i = 1; i <= point; i++) {
    // 获取伪元素, 注意语法只支持单 ':'
    rules.push(CSSRulePlugin.getRule(`.span${i}:before`))
}

// 原始角度
let rotate = 0;

// 设置初始位置
gsap.set(".span", {
    rotate: () => {
        rotate++;
        return rotate * deg;
    },
    opacity: 1,
});

// 设置伪元素初始透明度
gsap.set(rules, {
    opacity: 0,
});

// 伪元素动画
function anime(p) {
    gsap.fromTo(
        rules[p], // 传入伪元素对象组
        {
            opacity: 1,
            scale: 0,
        },
        {
            opacity: 0,
            scale: 1,
            duration: 1,
            repeat: -1,
        }
    );

}

// 执行次数
let time = 0
// 动画序列号
let p = 0

// 时间间隔定时器, 根据 point 来控制间隔, 小球动画间隔 50s 毫秒
let interval = setInterval(() => {
    anime(p)
    p++
    time++
    // 执行次数 等于 原点数量时, 清除定时器
    if (time >= point) {
        clearInterval(interval)
    }
}, 1000 / point);

// 色相动画
// filter: hue-rotate(0deg), 色相, GSAP 支持 css 所有属性, key同 css style, value 用对应字符串
gsap.fromTo(".container", {
    filter: 'hue-rotate(0deg)'
}, {
    filter: 'hue-rotate(360deg)',
    duration: 10,
    repeat: -1, //重复
})

