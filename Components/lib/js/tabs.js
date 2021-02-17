;(function () {
    'use strict';

    let tabList = {
        tabCount: 10,
        mountEl: '.plu-tabs',
        data: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    };

    boot(tabList);

    function boot (list) {
        let mountEl = document.querySelector(list.mountEl);
        let tabGroup = document.createElement('div');
        tabGroup.classList.add('tab');

        mountEl.appendChild(tabGroup);

        renderTab(list, tabGroup);
    }

    function createTab (i) {
        let tabEl = document.createElement('button');
        tabEl.innerText = i;
        tabEl.classList.add('tab');

        return tabEl;
    }

    function renderTab (list, tabGroup) {
        for (let i = 0; i < list.tabCount; i++) {
            let tabEl = createTab(list.data[i]);

            initTabStyle(tabEl);
            bindTabEvent(tabEl, tabGroup, list.data, i);
        }
    }

    function bindTabEvent (tabEl, tabGroup, data, index) {
        tabEl.addEventListener('click', () => {
            activeTab(tabEl);
            renderHtml(tabGroup, data, index);
        });
        tabGroup.appendChild(tabEl);
    }

    function activeTab (tabEl) {
        let activeTab = document.querySelector('.tabActive');

        activeTab && clearRender(activeTab);
        activeTabStyle(tabEl);
    }

    function initTabStyle (tabEl) {
        tabEl.style.border = 0;
        tabEl.style.margin = '5px';
        tabEl.style.color = 'white';
        tabEl.style.backgroundColor = '#aaa';
    }

    function activeTabStyle (tabEl) {
        tabEl.classList.add('tabActive');

        tabEl.style.color = 'black';
        tabEl.style.outline = 'none';
        tabEl.style.backgroundColor = '#f2f2f2';
    }

    function clearRender (activeTab) {
        let dataHtml = document.querySelector('.data-html');

        dataHtml.remove();
        activeTab.classList.remove('tabActive');
        initTabStyle(activeTab);
    }

    function renderHtml (tabGroup, data, index) {
        let dataEl = document.createElement('div');

        dataEl.classList.add('data-html');
        dataEl.innerHTML = `${data[index]}`;
        tabGroup.appendChild(dataEl);
    }
})();
