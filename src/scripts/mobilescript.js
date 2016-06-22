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
        dom.style.opacity = '1';
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
        menuIcon.onmouseenter = function () {
            console.log('enter');
            animate.fadeIn(menuItem);
        };
        menuIcon.onmouseleave = function () {
            console.log('leave');
            animate.fadeOut(menuItem);
        };
    };
    PageIndex.prototype.inite = function () {
        this.menuInterface();
    };
    return PageIndex;
}());
var indexHome = new PageIndex();
