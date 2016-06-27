var FadeAnimate = (function () {
    function FadeAnimate() {
    }
    FadeAnimate.prototype.fadeOut = function (dom) {
        var delay = parseFloat(getComputedStyle(dom, null).transitionDuration) || 0.2;
        dom.style.opacity = '0';
        function setHidden() {
            dom.style.display = 'none';
        }
        this.timeOut = setTimeout(setHidden, delay * 1000);
    };
    FadeAnimate.prototype.fadeIn = function (dom) {
        clearTimeout(this.timeOut);
        dom.style.opacity = '0';
        dom.style.display = 'block';
        function setOpacityOne() { dom.style.opacity = '1'; }
        ;
        setTimeout(setOpacityOne, 0);
    };
    return FadeAnimate;
}());
var animate = new FadeAnimate();
var PageIndex = (function () {
    function PageIndex() {
    }
    PageIndex.prototype.menuInterface = function () {
        var menuIcon = document.getElementsByClassName('nav-mobile')[0].getElementsByClassName('menu-area')[0];
        var menuItem = document.getElementsByClassName('nav-mobile')[0].getElementsByClassName('menu-area')[0].getElementsByClassName('menu')[0];
        menuIcon.onmouseover = function () {
            console.log('enter');
            animate.fadeIn(menuItem);
        };
        menuIcon.onmouseout = function () {
            console.log('leave');
            animate.fadeOut(menuItem);
        };
    };
    PageIndex.prototype.setVideoPlay = function () {
        var videoDom = document.getElementById('video-dom');
        var playMenu = document.getElementById('play-menu');
        function playVideo() {
            if (videoDom.paused) {
                videoDom.play();
            }
            else {
                videoDom.pause();
            }
        }
        videoDom.onclick = playVideo;
        playMenu.onclick = playVideo;
        videoDom.onplay = function () {
            animate.fadeOut(playMenu);
            videoDom.removeAttribute('controls');
        };
        videoDom.onpause = function () {
            animate.fadeIn(playMenu);
            videoDom.setAttribute('controls', 'true');
        };
    };
    PageIndex.prototype.pagesChange = function () {
        var itemPage = document.getElementsByClassName('menu')[0].getElementsByTagName('menuitem');
        var sectionDom = document.getElementsByClassName('pub-section');
        var _loop_1 = function(i) {
            itemPage[i].onclick = function () {
                for (var j = 0; j < sectionDom.length; j++) {
                    sectionDom[j].style.display = 'none';
                }
                animate.fadeIn(sectionDom[i]);
            };
        };
        for (var i = 0; i < itemPage.length; i++) {
            _loop_1(i);
        }
    };
    PageIndex.prototype.inite = function () {
        this.menuInterface();
        this.setVideoPlay();
        this.pagesChange();
    };
    return PageIndex;
}());
var indexHome = new PageIndex();
