import { gsap } from '../../node_modules/gsap/index.js';


// 申明共用的动画参数
let duration = 0.5;
let stagger = 0.03;

// 创建一个动画时间轴
var StartPageLine = gsap.timeline({
    delay: 2
});

// 在动画时间轴上添加动画
// EnterAnime 文字进入动画
// OutAnime 文字消失动画
StartPageLine.add(EnterAnime("SATextHead", 0.4));
StartPageLine.add(EnterAnime("SATextFooter", 0.4), 0.2);
StartPageLine.add(EnterAnime("t1", duration, stagger, 0.2), "-=0.2");
StartPageLine.add(OutAnime("t1", duration, stagger, 0.2),);
StartPageLine.add(EnterAnime("t2", duration, stagger, 0.2), "-=0.7");
StartPageLine.add(OutAnime("t2", duration, stagger, 0.2));
StartPageLine.add(EnterAnime("t3", duration, stagger, 0.2), "-=0.6");
StartPageLine.add(OutAnime("t3", duration, stagger, 0.2));
StartPageLine.add(EnterAnime("t4", duration, stagger, 0.2), "-=0.8");
StartPageLine.add(OutAnime("t4", duration, stagger, 0.2));
StartPageLine.add(EnterAnime("t5", duration, stagger, 0.2), "-=0.8");
StartPageLine.add(OutAnime("t5", duration, stagger, 0.2));
StartPageLine.add(EnterAnime("t6", duration, stagger, 0.2), "-=0.8");
StartPageLine.add(OutAnime("t6", duration, stagger, 0.2));
StartPageLine.add(OutAnime("SATextHead", 0.2), "-=1");
StartPageLine.add(OutAnime("SATextFooter", 0.2), "-=0.8");
StartPageLine.to(".StartPage", {
    opacity: 0,
    duration: 2,
    onComplete: function () {
        console.log("StartPageLine End");
    }
})


// 提取文字拆分
function textSplit(el, sc) {
    let element = document.querySelector(`.${el}`)

    // 获取元素中的文字
    let elArr = [...element.innerText]

    // 将元素文字替换成span包裹住
    elArr.reduce(function (pre, cur, index) {
        if (pre === index) {
            element.innerHTML = '';
        }
        // 创建一个 span
        let span = document.createElement('span');
        // span 内容等于 cur
        span.innerHTML = cur;
        // 处理空格
        if (cur == " ") {
            span.innerHTML = `&nbsp;`
        } else {
            span.innerHTML = cur;
        }
        element.appendChild(span).classList.add(sc, 'inline-block');
    }, 0);
}


// 文字进入动画
function EnterAnime(el, duration = 0.75, stagger = 0.01, delayTime = 0, y = 10) {
    // 判断 el 是否有效
    if (document.querySelector(`.${el}`) != null) {
        // 文字类, 动画中使用
        let spanclass = `${el}Span`

        // 调取拆分文字动画
        textSplit(el, spanclass)
        // 动画
        let anime = gsap.fromTo(
            `.${spanclass}`, {
            transformOrigin: 'bottom  center',
            y: `${y}`,
            opacity: 0,
            rotateX: 90,
        }, {
            y: 0,
            duration: `${duration}`,
            stagger: `${stagger}`,
            delay: `${delayTime}`,
            opacity: 1,
            rotateX: 0,
            ease: "none",
        }
        );
        return anime
    }
    return console.log('EnterAnime 元素无效');
}

// 文字消失动画
function OutAnime(el, duration = 0.5, stagger = 0.01, delayTime = 0) {
    // 判断 el 是否有效
    if (document.querySelector(`.${el}`) != null) {
        let element = document.querySelectorAll(`.${el}Span`)
        if (element.length) {
            return animeOut()
        } else {
            let spanclass = `${el}Span`
            textSplit(el, spanclass)
            return animeOut()
        }
        function animeOut() {
            let spanclass = `${el}Span`
            let anime = gsap.to(`.${spanclass}`, {
                transformOrigin: 'top  center',
                y: -0,
                duration: duration,
                stagger: stagger,
                delay: delayTime,
                opacity: 0,
                rotateX: 90,
            })
            return anime
        }
    }
    return console.log('OutAnime 元素无效');
}
