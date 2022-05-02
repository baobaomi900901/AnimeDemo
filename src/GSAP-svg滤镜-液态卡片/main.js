import gsap from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";

// 获取伪元素的插件
gsap.registerPlugin(CSSRulePlugin);

gsap.set('.rect1', {
    y: 40,
})


gsap.set('.rect2', {
    y: -20,
})

gsap.set('.smArc1', {
    y: 230,
    x: 40
})

gsap.set('.smArc2', {
    y: 240,
    x: 110
})

gsap.set('.smArc3', {
    y: 245,
    x: 120
})

gsap.set('.smArc1f', {
    y: -35,
    x: 40
})

gsap.set('.smArc2f', {
    y: -20,
    x: 110
})

gsap.set('.smArc3f', {
    y: -25,
    x: 120
})

gsap.set('#btn', {
    y: 40,
})



gsap.set('.myContent', {
    opacity: 0
})


const btn = document.getElementById('btn');

let control = false;



btn.addEventListener('click', () => {
    if (!control) {
        btnOn()
        control = true;
    } else {
        btnOff()
        control = false;
    }
})


function btnOn() {
    gsap.to('.rect1', {
        y: -30,
    })
    gsap.to('#btn', {
        y: -30,
    })
    gsap.to('.myTitle', {
        y: -70,
    })
    gsap.to('.btnIcon', {
        rotation: 180,
        duration: 0.5,
    })
    gsap.to('.rect2', {
        y: 30,
    })
    gsap.to('.myContent', {
        y: 50,
        opacity: 1,
        delay: 0.1
    })
    gsap.to('.smArc1', {
        y: 195,
        duration: 0.4,
        ease: 'power2.inOut',
        delay: 0.25
    })
    gsap.to('.smArc2', {
        y: 200,
        duration: 0.4,
        ease: 'power2.inOut',
        delay: 0.2
    })
    gsap.to('.smArc3', {
        y: 200,
        duration: 0.4,
        ease: 'power2.inOut',
        delay: 0.225
    })

    gsap.to('.smArc1f', {
        y: 0,
        duration: 0.4,
        ease: 'power2.inOut',
        delay: 0.25
    })
    gsap.to('.smArc2f', {
        y: 0,
        duration: 0.4,
        ease: 'power2.inOut',
        delay: 0.2
    })
    gsap.to('.smArc3f', {
        y: 0,
        duration: 0.4,
        ease: 'power2.inOut',
        delay: 0.225
    })
}

function btnOff() {
    gsap.to('.rect1', {
        y: 40,
    })
    gsap.to('#btn', {
        y: 40,
    })
    gsap.to('.myTitle', {
        y: 0,
    })
    gsap.to('.btnIcon', {
        rotation: 0,
        duration: 0.5,
    })
    gsap.to('.rect2', {
        y: -20,
    })
    gsap.to('.myContent', {
        y: 0,
        opacity: 0,
        duration: 0.5,
    })
    gsap.to('.smArc1', {
        y: 230,
        duration: 0.4,
        ease: 'power2.inOut',
        delay: 0.25
    })
    gsap.to('.smArc2', {
        y: 240,
        duration: 0.4,
        ease: 'power2.inOut',
        delay: 0.2
    })
    gsap.to('.smArc3', {
        y: 245,
        duration: 0.4,
        ease: 'power2.inOut',
        delay: 0.225
    })

    gsap.to('.smArc1f', {
        y: -35,
        duration: 0.4,
        ease: 'power2.inOut',
        delay: 0.25
    })
    gsap.to('.smArc2f', {
        y: -20,
        duration: 0.4,
        ease: 'power2.inOut',
        delay: 0.2
    })
    gsap.to('.smArc3f', {
        y: -25,
        duration: 0.4,
        ease: 'power2.inOut',
        delay: 0.225
    })
}