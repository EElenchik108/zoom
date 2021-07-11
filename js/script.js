"use strict";

let header = document.querySelector('header');

function offset(el) {
    const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
    }
};
window.addEventListener('scroll', () => {
    if (window.pageYOffset > (header.offsetHeight) / 2) {
        header.classList.add('_color');
    } else header.classList.remove('_color');
});

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
        );
    }
};

if (isMobile.any()) {
    document.body.classList.add('-touch');

    let menuArrows = document.querySelectorAll('.menu__arrow');
    
    if (menuArrows.length > 0) {
        for (let i = 0; i < menuArrows.length; i++) {
            const menuArrow = menuArrows[i];
            menuArrow.addEventListener('click', function (e) {
                menuArrow.parentElement.classList.toggle('-active');
            });
        }
    }
} else {
    document.body.classList.add('-pc');
}

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

            if (iconMenu.classList.contains('-active')) {
                document.body.classList.remove('-lock');
                iconMenu.classList.remove('-active');
                menuBody.classList.remove('-active');
            }
            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}

const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
    iconMenu.addEventListener('click', function (e) {
        document.body.classList.toggle('-lock');
        iconMenu.classList.toggle('-active');
        menuBody.classList.toggle('-active');
    });
}

// -------------------Video-----------

const videoWallpaper = document.querySelector('.video__wallpaper');
const videoBlock = document.querySelector('.video');
let windowHight = document.documentElement.clientHeight;

videoWallpaper.addEventListener('click', (event) => {
    videoWallpaper.style.opacity = "0";
    event.preventDefault();
    setTimeout(() => {
        videoWallpaper.style.display = "none";
    }, 600);

    getMap();

});

function getMap() {
    let video = document.querySelector('.video');
    let loadVideoUrl = video.dataset.video;
    if (loadVideoUrl) {
        video.insertAdjacentHTML("beforeend", `<iframe width="560" height="315" src="${loadVideoUrl}?autoplay=1&amp;loop=1&amp;&amp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
    }
}

window.addEventListener('scroll', (event) => {
    if ((videoBlock.getBoundingClientRect().top + (videoBlock.getBoundingClientRect().height / 2)) < 0) {
        videoWallpaper.style.opacity = "1";
        setTimeout(() => {
            videoWallpaper.style.display = "flex";
            if(document.querySelector('.video iframe')) document.querySelector('.video iframe').remove();
        }, 600);
    }
})

document.addEventListener('DOMContentLoaded', () => {
    let toTopBtns = document.querySelectorAll('._scroll-to');   
    for(let i = 0; i < toTopBtns.length; i++){
       toTopBtns[i].addEventListener('click', function () {
        window.scrollBy({
            top: -document.documentElement.scrollHeight
        });
    }); 
    }    
});

//-----------Slider-----------

const sliderQuotes = document.querySelectorAll('.slider__quote');
const sliderSwitchs  = document.querySelectorAll('.slider__switch__item');
let count = 0;

function sliderShow(){    
    if(count>=sliderQuotes.length) count=0;
    for(let j=0; j<sliderQuotes.length; j++){
        sliderQuotes[j].classList.remove('slider__quote-active');
    }
    for(let k=0; k<sliderSwitchs.length; k++){
        sliderSwitchs[k].classList.remove('slider__switch__item-active');
    }
    sliderQuotes[count].classList.add('slider__quote-active');
    sliderSwitchs[count].classList.add('slider__switch__item-active');

}
for (let i=0; i<sliderSwitchs.length; i++){
    sliderSwitchs[i].addEventListener('click', ()=> {
        count = i;
        sliderShow();
    })
}
setInterval(()=>{
    count++;
    sliderShow();
}, 12000);

