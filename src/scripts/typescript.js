/// <reference path="./jquery.d.ts" />
var globalMethod = (function () {
    function globalMethod() {
        this.initNumber = 0;
    }
    globalMethod.prototype.numPlus = function (num) {
        this.initNumber += num;
        return this.initNumber;
    };
    globalMethod.prototype.numMinus = function (num) {
        this.initNumber -= num;
        return this.initNumber;
    };
    globalMethod.prototype.getNum = function () {
        return this.initNumber;
    };
    globalMethod.prototype.setNum = function (num) {
        this.initNumber = num;
        return this.initNumber;
    };
    return globalMethod;
}());
var PublicMethod = (function () {
    function PublicMethod() {
    }
    return PublicMethod;
}());
var PagesMethod = (function () {
    function PagesMethod() {
    }
    PagesMethod.prototype.index = function () {
        var glbMtd = new globalMethod();
        var newMtd = new globalMethod();
        function setVideoDisplay(element) {
            element.css({
                'margin-left': 100 * glbMtd.getNum() + '%'
            });
        }
        function displayVideo() {
            $('.video-block .right-direct').on('click', function () {
                var transformDiv = $('.videos-display .videos-container');
                glbMtd.numMinus(1) < -2 ? glbMtd.numPlus(1) : glbMtd.getNum();
                setVideoDisplay(transformDiv);
            });
            $('.video-block .left-direct').on('click', function () {
                var transformDiv = $('.videos-display .videos-container');
                glbMtd.numPlus(1) > 0 ? glbMtd.numMinus(1) : glbMtd.getNum();
                setVideoDisplay(transformDiv);
            });
        }
        function displayPages() {
            var pagesSection = $('.body-main');
            var navALink = $('.nav-direct a');
            var enScroll = true;
            function pagesTramsform(element) {
                element.css({
                    'top': 100 * newMtd.getNum() + '%'
                });
            }
            $('body').mousewheel(function (event, delta, deltaX, deltaY) {
                console.log(enScroll);
                if (delta > 0 && enScroll) {
                    newMtd.numPlus(1) > 0 ? newMtd.numMinus(1) : newMtd.getNum();
                    pagesTramsform(pagesSection);
                    setNavActived();
                    enScroll = false;
                }
                else if (enScroll) {
                    newMtd.numMinus(1) < -2 ? newMtd.numPlus(1) : newMtd.numMinus(0);
                    pagesTramsform(pagesSection);
                    setNavActived();
                    enScroll = false;
                }
                if (!enScroll) {
                    var delaySet = setTimeout(function () {
                        enScroll = true;
                    }, 500);
                }
            });
            function setNavActived() {
                var num = -newMtd.getNum();
                console.log(num);
                if (!navALink.eq(num).hasClass('actived')) {
                    navALink.removeClass('actived');
                    navALink.eq(num).addClass('actived');
                }
            }
            function setNavLink(to) {
                newMtd.setNum(to);
                pagesTramsform(pagesSection);
            }
            ;
            function setLinkTo() {
                $('.nav-direct a').each(function (index) {
                    $(this).click(function () {
                        setNavLink(-index);
                        setNavActived();
                    });
                });
            }
            setLinkTo();
        }
        displayVideo();
        displayPages();
    };
    return PagesMethod;
}());
var pgsMtd = new PagesMethod();
