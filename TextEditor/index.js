'use strict';

let flag = false;
// const imgUrl = "url(./IU.png)";
const placeholder = 'Note Everything ...';
const eventObj= {
    'beforeunload': beforeunload,
    'pagehide': beforeunload,
    'load': load,
    'pageshow': load,
    'drop': drop,
    'keydown': keydown
};

init();

function init () {
    for (const evKey in eventObj) {
        window.addEventListener(evKey, eventObj[evKey]);
    }

    document.body.contentEditable = true;
    document.body.style.cssText =
        `font-size: 1.5rem;
             line-height: 1.5;
             width: 75%;
             margin: 0 auto;
             padding: 4rem;
             color: black;`
    // background: center / cover fixed no-repeat ${imgUrl};
}

function beforeunload () {
    !flag
        ? localStorage.setItem('content', document.body.innerHTML)
        : localStorage.setItem('content', '');
}

function load () {
    let content = localStorage.getItem('content');

    flag = true;

    if (!content) {
        document.body.innerHTML = placeholder;
        window.addEventListener('click', e => {
            e.target.innerHTML === placeholder && (e.target.innerHTML = '');
            flag = false;
        });
    } else {
        document.body.innerHTML = content;
        flag = false;
    }
}

function drop (e) {
    e.preventDefault();

    !localStorage.getItem('content').length
    && (document.body.innerHTML === placeholder)
    && (document.body.innerHTML = '');

    let file = new FileReader();
    file.readAsDataURL(e.dataTransfer.files[0]);

    file.onload = function () {
        let img = document.createElement('img');
        img.src = file.result;
        document.body.appendChild(img);
    };
}

function keydown (e) {
    if (e.key === "Tab") {
        fontColor(e, 1);
    } else if ((e.metaKey || e.ctrlKey) && (e.key === 'r')) {
        fontColor(e, 0, 'red');
    } else if ((e.metaKey || e.ctrlKey) && (e.key === 'b')) {
        fontColor(e, 0, 'black');
    } else {
        return true;
    }
}

function fontColor (e, offset, color) {
    e.preventDefault();
    let range = e.view.getSelection().getRangeAt(0);
    let div = document.createElement('div');

    div.style.cssText = 'vertical-align: text-top;display: inline-block;';

    if (color) {
        div.innerHTML = '&nbsp';
        div.style.color = color;
    } else {
        div.innerHTML = '&nbsp &nbsp &nbsp &nbsp';
    }

    e.view.getSelection().removeAllRanges();
    e.view.getSelection().addRange(range);

    range.insertNode(div);
    range.setStart(div, offset);
    range.setEnd(div, 1);
}
