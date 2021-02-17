;(function () {
    'use strict';

    boot();

    function boot () {
        let form = document.getElementById('search-form');
        let input = form.querySelector('input');
        let url = 'https://api.github.com/search/users?q=';

        form.addEventListener('submit', e => {
            url += input.value;
            e.preventDefault();
            input.value && api('get', url, input);
            // form.reset();
        });
    }

    function api (method, url, input) {
        let http = new XMLHttpRequest();

        http.open(method, url);
        http.send();

        http.addEventListener('load', () => {
            let data = JSON.parse(http.responseText);
            render(data);
        });
    }

    function render (data) {
        let userList = document.querySelector('.userList');
        let countEl = document.createElement('div');

        userList.innerHTML = '';
        countEl.innerHTML = `
        <span>totalCount : ${data.total_count}</span>
        <h2>userList:</h2>
    `;
        userList.appendChild(countEl);

        data.items.forEach(item => {
            let userEl = document.createElement('div');
            userEl.innerHTML = `${item.login}`;
            userList.appendChild(userEl);
        });
    }
})();