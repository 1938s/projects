;(function () {
    'use strict';

//========= 用户自定义 ===========
    let config = {
        element: {
            liked: '.liked',
            popup: '.popup',
        },
        position: {
            // top / bottom / left / right / top-right / right-top
            rePosition: 'top',
            yOffset: 0,
            xOffset: 0,
        }
    };
    //==============================

    let liked, popup, mask;

    Boot(config);

    function Boot (conf) {
        liked = document.querySelector(conf.element.liked);
        popup = document.querySelector(conf.element.popup);

        liked.addEventListener('click', () => {
            showPopup(conf.position);
        });
    }

    function showPopup (pos) {
        popup.style.display = 'block';

        position(pos);
        initMask();
        bindEvent();
    }

    function initMask () {
        mask = document.createElement('div');
        mask.classList.add('mask');
        document.body.appendChild(mask);
    }

    function bindEvent () {
        mask.addEventListener('click', hidePopup);
        window.addEventListener('keyup', removeEvent);
    }

    function hidePopup () {
        mask = document.querySelector('.mask');

        if (mask) {
            popup.style.display = ' none';
            document.body.removeChild(mask);
        }
    }

    function removeEvent (e) {
        if (e.key === 'Escape') {
            hidePopup();
            window.removeEventListener('keyup', removeEvent);
        }
    }

    function position (pos) {
        let style = popup.style;
        let repos = pos.rePosition;
        let xOffset = pos.xOffset;
        let yOffset = pos.yOffset;

        let width = popup.offsetWidth;
        let height = popup.offsetHeight;
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;

        if (!repos.includes('-')) {
            if (repos === 'top' || repos === 'bottom')
                repos += '-centerX';
            else if (repos === 'left' || repos === 'right')
                repos += '-centerY';
            else
                repos += 'centerX-centerY';
        }

        if (repos.includes('centerX')) {
            style.left = windowWidth / 2 - width / 2 + xOffset;
        }

        if (repos.includes('centerY')) {
            style.top = windowHeight / 2 - height / 2 + yOffset;
        }

        if (repos.includes('top'))
            style.top = yOffset;

        if (repos.includes('bottom'))
            style.bottom = yOffset;

        if (repos.includes('left'))
            style.left = xOffset;

        if (repos.includes('right'))
            style.right = xOffset;
    }
})();