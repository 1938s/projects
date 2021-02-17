;(function () {
    'use strict';

    // 用户配置
    let config = {
        mode: 'fade', // fade & slide
        interval: '1000',
    };
// ==================================================

    const slider = document.querySelector('.fade');
    const items = slider.querySelectorAll('.fade-item');

    let curr, prev, next;
    let current = 0;
    let length = items.length - 1;

    boot();

    function boot () {
        filter(config);
        slideIn(config);
    }

    function filter (conf) {
        switch (conf.mode) {
            case 'slide':
                slide();
                break;
            case 'fade':
                hide();
                fade();
                break;
            default:
                slide();
                break;
        }
    }

    function slideIn (conf) {
        setInterval(() => {
            increment();

            filter(conf);
        }, conf.interval);
    }

// fade 淡入淡出
    function fade () {
        seat();

        prev.style.opacity = 0;
        curr.style.opacity = 1;
        next.style.opacity = 0;
    }

    function hide () {
        items.forEach(i => {
            i.style.zIndex = 0;
        });
    }

// slide 轮播
    function slide () {
        seat();
        slideX();
        slideZ();
    }


    function slideX () {
        curr.style.left = 0;
        prev.style.left = -prev.offsetWidth + 'px';
        next.style.left = +next.offsetWidth + 'px';
    }

    function slideZ () {
        curr.style.zIndex = 3;
        prev.style.zIndex = 0;
        next.style.zIndex = 0;
    }

    function increment () {
        current < length ? current++ : current = 0;
    }

    function seat () {
        curr = items[current];

        current === 0 ? prev = items[length] : prev = items[current - 1];
        current === length ? next = items[0] : next = items[current + 1];
    }
})();