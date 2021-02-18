'use strict';

let count = 0;
let musicList = [];
let playStatus = false;

let inputFile = document.getElementById('inputFile');
let audio = document.getElementById('audio');
let loopOne = document.getElementById('loopOne');
let loopOrder = document.getElementById('loopOrder');
let loopRandom = document.getElementById('loopRandom');
let searchInput = document.getElementById('music-search-input');
let musicPlayerForm = document.querySelector('form');
let musicPlayer = document.querySelector('.music-player');
let musicListEl = document.querySelector('.music-list');
let musicTotal = document.querySelector('.music-total');
let musicCurrent = document.querySelector('.music-current');
let musicPlayerBtn = document.querySelector('.music-player-btn');
let musicProgressBar = document.querySelector('.music-progress-bar');

inputFile.addEventListener('change', ev => {
    getFiles(ev);
});
audio.addEventListener('play', play);
audio.addEventListener('pause', pause);
audio.addEventListener('timeupdate', ev => {
    audioPercent(ev);
});
musicPlayerForm.addEventListener('submit', ev => {
    ev.preventDefault();
    search();
});
document.body.addEventListener('click', ev => {
    let musicSearchList = document.querySelector('.music-search-list');
    if (ev.target.className !== 'search-item' && musicSearchList) {
        musicSearchList.style.display = 'none';
        searchInput.value = '';
    }
});

function getFiles (e) {
    musicTotal.style.display = 'inline-block';
    musicPlayer.style.display = 'block';

    for (const file of e.target.files) {
        if(audioCode(file.name)) {
            let path = URL.createObjectURL(file);
            let el = document.createElement('div');
            musicList.unshift({
                name: file.name,
                path: path
            });

            el.innerText = file.name;
            el.style.cssText = 'cursor: pointer;line-height: 2rem;font-size: 1.3rem;';
            mouseHover(el, path);
            el.addEventListener('click', () => {
                document.title = file.name;
                musicCurrent.innerHTML = file.name;
                audio.src = path;
                playMode('play');
                setMusicColor(el);
                audio.addEventListener('ended', this.pause);
            });
            count ++
            musicListEl.append(el);
        }
    }
    musicTotal.innerHTML = count + ' files.';
}

function audioCode(name) {
    return (name.includes('.mp3')
        || name.includes('.flac')
        || name.includes('.ogg')
        ||name.includes('.m4a')
        ||name.includes('.aac')
        ||name.includes('.wav')
        ||name.includes('.alac')
        ||name.includes('.wma')
        ||name.includes('.opus')
        ||name.includes('.webm'))
}

function loopMode (mode) {
    if (audio) {
        if (mode === 'one') {
            audio.loop = true;
            setLoopColor('loopOne');
        } else if (mode === 'order') {
            audio.loop = false;
            setLoopColor('loopOrder');
            next();
            audio.addEventListener('ended', next);
        } else {
            audio.loop = false;
            setLoopColor('loopRandom');
            random();
            audio.addEventListener('ended', this.random);
        }
    }
}

function next () {
    setMusicColor('next');
    let musicItem = musicList.pop();
    let path = musicItem.path;

    document.title = musicItem.name;
    musicCurrent.innerHTML = musicItem.name;
    audio.src = path;
    musicList.unshift({
        name: musicItem.name,
        path: path
    });
    play();
}

function random () {
    let index = Math.floor(Math.random() * musicList.length);
    setMusicColor('random', index);

    let musicItem = musicList[index];
    let path = musicItem.path;

    document.title = musicItem.name;
    musicCurrent.innerHTML = musicItem.name;
    audio.src = path;
    musicList.unshift({
        name: musicItem.name,
        path: path
    });
    play();
}

function setLoopColor (mode) {
    if (mode === 'loopOne') {
        loopOne.style.color = 'red';
        loopOrder.style.color = 'black';
        loopRandom.style.color = 'black';
    } else if (mode === 'loopOrder') {
        loopOne.style.color = 'black';
        loopOrder.style.color = 'red';
        loopRandom.style.color = 'black';
    } else {
        loopOne.style.color = 'black';
        loopOrder.style.color = 'black';
        loopRandom.style.color = 'red';
    }
}

function audioPercent (ev) {
    let musicProgressBar = document.querySelector('.music-progress-bar');
    let musicProgress = document.querySelector('.music-progress');
    let musicProgressBarLength = +(getComputedStyle(musicProgressBar).width.split('px')[0]);
    if (ev.target.duration) {
        let musicProgressPercent = ev.target.currentTime / ev.target.duration * musicProgressBarLength;
        musicProgress.style.width = musicProgressPercent + 'px';
    }
}

function search () {
    if (searchInput.value) {
        let musicSearchList = document.querySelector('.music-search-list');
        musicSearchList.innerHTML = '';
        musicSearchList.style.display = 'block';
        musicList.forEach((it, index) => {
            let div = document.createElement('div');
            if (it.name.includes(searchInput.value)) {
                div.innerText = it.name;
                div.className = 'search-item';
                div.style.cssText = 'line-height: 1.5rem; cursor: pointer';
                mouseHover(div);
                div.addEventListener('click', () => {
                    audio.src = musicList[index].path;
                    play();
                    setMusicColor('search', index);
                    searchInput.value = '';
                    musicCurrent.innerHTML = it.name;
                    document.title = it.name;
                    musicSearchList.style.display = 'none';
                });
            }
            musicSearchList.append(div);
        });
    }
}

function playMode (mode) {
    if (audio && audio.src) {
        if (mode === 'play') {
            play();
        } else {
            playStatus ? pause() : play();
        }
    } else {
        loopMode('order');
    }
}

function clickInput () {
    inputFile.click();
}

function play () {
    audio.play();
    playStatus = true;
    musicPlayerBtn.innerHTML = 'Pause';
    musicProgressBar.style.display = 'block';
}

function pause () {
    audio.pause();
    playStatus = false;
    musicPlayerBtn.innerHTML = 'Play';
}

function mouseHover (div, path) {
    div.addEventListener('mouseover', () => {
        div.style.color = 'red';
    });
    div.addEventListener('mouseleave', () => {
        if (path && path === audio.src) {
            div.style.color = 'red';
        } else {
            div.style.color = 'black';
        }
    });
}

function setMusicColor (el, index) {
    if (el === 'next') {
        musicListEl.childNodes.forEach(it => {
            let index = musicList.length;
            if (it.innerText !== musicList[index - 1].name) {
                it.style.color = 'black';
            } else {
                it.style.color = 'red';
            }
        });
    } else if (el === 'random') {
        musicListEl.childNodes.forEach(it => {
            if (it.innerText !== musicList[index].name) {
                it.style.color = 'black';
            } else {
                it.style.color = 'red';
            }
        });
    } else if (el === 'search') {
        musicListEl.childNodes.forEach(it => {
            if (it.innerText !== musicList[index].name) {
                it.style.color = 'black';
            } else {
                it.style.color = 'red';
            }
        });
    } else {
        musicListEl.childNodes.forEach(it => {
            it.style.color = 'black';
        });
        el.style.color = 'red';
    }
}
