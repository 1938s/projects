;(function () {
    'use strict';

    const list = [
        {
            id: 1,
            name: '王二小',
        },
        {
            id: 2,
            name: '李二狗',
        },
        {
            id: 3,
            name: '赵四儿',
        },
        {
            id: 4,
            name: '张三儿',
        },
    ];

    boot();

    function boot () {
        let main = document.querySelector('#dropdown');
        let dropdown = document.createElement('form');

        dropdown.classList.add('drop-form');
        dropdown._datalist = list;
        dropdown.innerHTML = `
            <input type="text" autofocus placeholder="列表内任一名字">
            <button type="submit">Search</button>
            <div class="drop-list"></div>`;

        main.appendChild(dropdown);
        bindEvent(dropdown);
    }

    function bindEvent (dropdown) {
        let form = document.querySelector('.drop-form');
        form.addEventListener('submit', e => {
            e.preventDefault();

            renderDrop(dropdown);
            // form.reset();
        });
    }

    function renderDrop (dropdown) {
        let drop = dropdown.querySelector('.drop-list');
        let input = dropdown.querySelector('input').value;
        let dataList = dropdown._datalist;

        drop.innerHTML && (drop.innerHTML = '');

        if (input) {
            dataList.forEach(it => {
                let data = document.createElement('div');
                data.hidden = true;

                data.innerHTML = `${it.name}`;
                drop.appendChild(data);
                (it.name.includes(input)) && (data.hidden = false);
            });
        }
    }

})();