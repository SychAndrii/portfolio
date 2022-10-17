/*
const motoBlock = document.querySelector('.covering-sych-block');
motoBlock.addEventListener('animationend', (e) => {
    const andrii_block = document.querySelector('.andrii-block')
    const atomicVal = 1;
    while(andrii_block.getBoundingClientRect().top > 200) {
        
    }
})

function getComputedFontSize(elem) {
    return window.getComputedStyle(elem, null).getPropertyValue('font-size').replace("px", "");
}
*/
//lang switcher
const lang_switcher = document.querySelector('.header__lang');
const lang_container = document.querySelector('.lang-container');
const body = document.querySelector('body') || document.documentElement;
let i = 0;

let isSwitcherOpen = false;
lang_switcher.addEventListener('click', (e) => {
    e.preventDefault();
    if(!isSwitcherOpen) 
        showLangMenu();
    else 
        hideLangMenu();
});

function getCurrentDisplay(elem) {
    return window.getComputedStyle(elem).getPropertyValue('display');
}

function setCurrentDisplay(elem, value) {
    elem.style.display = value;
}

function graduallyShowElem(elem, toOpacity = 1) {
    let opacity_value = 0;
    const atomic_value = 0.04;
    return new Promise((resolve, reject) => {
        const interval_id = setInterval(() => {
            if(opacity_value < toOpacity) {
                elem.style.opacity = opacity_value.toString();
                opacity_value += atomic_value;
            }
            else {
                clearInterval(interval_id);
                elem.style.opacity = toOpacity.toString();
                resolve();
            }
    }, 10);
    });
}

function graduallyHideElem(elem, atomic_value = 0.02) {
    let opacity_value = elem.style.opacity;
    return new Promise((resolve, reject) => {
        const interval_id = setInterval(() => {
            if(opacity_value >= 0) {
                elem.style.opacity = opacity_value.toString();
                opacity_value -= atomic_value;
            }
            else {
                clearInterval(interval_id);
                elem.style.opacity = "0";
                resolve();
            }
    }, 10);
    })
}

function hideLangMenu() {
    return new Promise((resolve, reject) => {
        lang_switcher.classList.remove('_is-active-simple-link');
        graduallyHideElem(lang_container, 0.04).then(() => {
            setCurrentDisplay(lang_container, "none");
            isSwitcherOpen = false;
            resolve();
        })
    })
}

function showLangMenu() {
    return new Promise((resolve, reject) => {
        setCurrentDisplay(lang_container, "block");
        graduallyShowElem(lang_container);
        lang_switcher.classList.add('_is-active-simple-link');
        clickEventExcept([lang_switcher, lang_container], hideLangMenu);
        isSwitcherOpen = true;
        resolve()
    }) 
}

//internationalization

const languages = {
     ukr: {
        nav__link: ['Проекти', 'Навички'],
        header__lang: ['укр'],
        'lang-container__item': ['англ', 'укр'],
        'main-text-container__heading': ['Привіт, я Андрій.'],
        'main-text-container__p': ['Мені 18, я родом з України. Я любитель програмування.', 'Я б не сказав, що можу уявити себе десь окрім цієї роботи.']
    }
}

let current_language = 'eng';

document.querySelectorAll('.lang-container__item').forEach((item) => item.addEventListener('click', (e) => {
    e.preventDefault();
    switchLanguage(e.target.dataset.lang);
}));

function switchLanguage(lang) {
    for (const selector in languages[lang]) {
            const dom_objects = document.querySelectorAll('.' + selector);
            for (let index = 0; index < languages[lang][selector].length; index++) 
                dom_objects[index].innerHTML = languages[lang][selector][index];
    }
}
//right menu
let menuShown = false;
const rightMenu = document.querySelector('.right-menu');
const right_menu_black_cover = document.querySelector('.right-menu-black-cover')
const menu_open_button = document.querySelector('.header__menu-button');
menu_open_button.addEventListener('click', showRightMenu);
document.querySelector('.right-menu__hide-button').addEventListener('click', hideRightMenu);

function editPageScrolling(htmlOverflow, bodyOverflow) {
    document.documentElement.style.overflowY = htmlOverflow;
    document.querySelector('body').style.overflowY = bodyOverflow;
}

function disablePageScrolling() {
    editPageScrolling("hidden", 'hidden');
}

function enablePageScrolling() {
    editPageScrolling('initial', 'initial');
}

 function clickEventExceptOn(e, elems, handler) {
    if( elems.filter((elem) => elem == e.target) == 0 )
        handler();
 }

 function hideRightMenu() {
    setCurrentDisplay(rightMenu, "none");
    setCurrentDisplay(lang_switcher, "block");
    graduallyHideElem(right_menu_black_cover);
    enablePageScrolling();
    menuShown = false;
 }

 function showRightMenu() {
    setCurrentDisplay(rightMenu, "flex");
    setCurrentDisplay(lang_container, "none");
    setCurrentDisplay(lang_switcher, "none");
    graduallyShowElem(right_menu_black_cover, 0.5);
    lang_switcher.classList.remove('_is-active-simple-link');
    disablePageScrolling();
    clickEventExcept([rightMenu, document.querySelector('.right-menu__header'), menu_open_button], hideRightMenu);
    menuShown = true;
 }


function clickEventExcept(except_elems, handler) {
    body.addEventListener( 'click', (e) => clickEventExceptOn(e, except_elems, handler) )
}

//header bg
/*
function getViewportWidth() {
    return vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
}

function setHeaderBG() {
    const screen_width = getViewportWidth();
    const small_video_breakpoint = 650;
    if(screen_width <= small_video_breakpoint) 
        setSmallVideo();
}

function setSmallVideo() {
    const video = document.querySelector('video');
    const small_video_src = "./resources/other_bg.mp4";
    const video_source = document.querySelector('source');
    video.pause();
    
    video_source.setAttribute('src', small_video_src);
    video_source.setAttribute('type', 'video/webm');

    video.load();
    video.play();
}

setHeaderBG();
*/