export default class Utils {
    constructor(element) {
        this.element = element;
    }

    // 监听鼠标
    captureMouse(element) {
        // 鼠标参数
        let mouse = { x: 0, y: 0, event: null }
        // el 距离屏幕边缘的位置
        let offsetLeft = element.offsetLeft
        let offsetTop = element.offsetTop;


        element.addEventListener('mousemove', function (event) {
            let x, y;
            // 鼠标实际位置 减去 页面实际位置, 得到相对于画布的 鼠标坐标
            x = event.pageX - offsetLeft;
            y = event.pageY - offsetTop;
            mouse.x = x;
            mouse.y = y;
            mouse.event = event;
            // console.log(mouse);
        }, false);
        return mouse;
    };

    captureTouch() {
        let touch = { x: null, y: null, isPressed: false, event: null }
        // el 距离屏幕边缘的位置
        let offsetLeft = this.element.offsetLeft
        let offsetTop = this.element.offsetTop;

        this.element.addEventListener('touchstart', function (event) {
            touch.isPressed = true;
            touch.event = event;
            touch.x = event.touches[0].clientX - offsetLeft;
            touch.y = event.touches[0].clientY - offsetTop;
        }, false);

        this.element.addEventListener('touchend', function (event) {
            touch.isPressed = false;
            touch.event = event;
        }, false);

        this.element.addEventListener('touchmove', function (event) {
            let x, y,
                touch_event = event.touches[0]; //first touch
            x = touch_event.pageX - offsetLeft;
            y = touch_event.pageY - offsetTop;

            touch.x = x;
            touch.y = y;
            touch.event = event;
        }, false);

        return touch;
    }


    // 解析颜色
    parseColor(color, toNumber) {
        if (toNumber === true) {
            if (typeof color === 'number') {
                return (color | 0); // 去除小数点
            }
            if (typeof color === 'string' && color[0] === '#') {
                color = color.slice(1);
            }
            return window.parseInt(color, 16);
        } else {
            if (typeof color === 'number') {
                color = '#' + ('00000' + (color | 0).toString(16)).substr(-6); //提取字符串的前6位
            }
            return color;
        }
    };

    // 包含点
    containsPoint(rect, x, y) {
        return !(x < rect.x ||
            x > rect.x + rect.width ||
            y < rect.y ||
            y > rect.y + rect.height);
    };

    // 元素 1 与元素 2
    intersects(rectA, rectB) {
        // 取反
        // 全部不满足时, 返回 false
        return !(rectA.x + rectA.width < rectB.x ||
            rectB.x + rectB.width < rectA.x ||
            rectA.y + rectA.height < rectB.y ||
            rectB.y + rectB.height < rectA.y);
    };
}
