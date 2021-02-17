;(function () {
    'use strict';

    boot();

    let elError;
    let inputData = {};
    let inputError = [];

    function boot () {
        let form = document.querySelector('#valid-form');

        form.addEventListener('submit', e => {
            e.preventDefault();
            inputData.email = form.querySelector('[name=email]').value;
            inputData.phone = form.querySelector('[name=phone]').value;
            inputData.username = form.querySelector('[name=username]').value;
            inputData.password = form.querySelector('[name=password]').value;

            wipeData(form);
            validData(inputData, form);
        });
    }

    function wipeData (form) {
        form.reset();
        inputError = [];
        elError && elError.remove();
    }

    function validData (input, form) {
        if (!isUsername(input.username))
            inputError.push('用户名长度 4-7');
        if (!isEmail(input.email))
            inputError.push('邮箱应包含"@"');
        if (!isPhone(input.phone))
            inputError.push('电话长度 11');
        if (!isPassword(input.password))
            inputError.push('密码长度 6-12');

        inputError.length !== 0
            ? renderError(form)
            : alert('登录成功');
    }

    function isUsername (str) {
        return !strLength(str, 4, 7);
    }

    function isEmail (str) {
        return str.includes('@');
    }

    function isPhone (str) {
        return !(strLength(str, 11, 11) || !str.startsWith('1'));
    }

    function isPassword (str) {
        return !strLength(str, 6, 12);
    }

    function strLength (str, mix, max) {
        return (str.length < mix) || (str.length > max);
    }

    function renderError (form) {
        let el = document.createElement('div');
        el.innerText = `${inputError}`;
        elError = form.appendChild(el);

        elError.style.color = 'red';
        elError.style.fontSize = '1.2rem';
        elError.style.fontWeight = 'bold';
        elError.style.margin = '10px';
    }
})();
