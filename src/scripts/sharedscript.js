var FormatData = (function () {
    function FormatData() {
    }
    FormatData.prototype.secondFormat = function (seconds, type) {
        var scds = 1;
        var mnts = 60 * scds;
        var hrs = 60 * mnts;
        var class1Scale = 1;
        var class2Scale = 1;
        var class3Scale = 1;
        if (type === 'hours') {
            class1Scale = hrs;
            class2Scale = mnts;
            class3Scale = scds;
        }
        else if (type === 'minutes') {
            class1Scale = mnts;
            class2Scale = scds;
            class3Scale = NaN;
        }
        var hrsDivider = parseInt((seconds / class1Scale).toString());
        var hrsModulo = seconds % class1Scale;
        var mntsDivider = parseInt((hrsModulo / class2Scale).toString());
        var mntsModulo = hrsModulo % class2Scale;
        var twoClses = (hrsDivider < 10 ? ('0' + hrsDivider) : hrsDivider) + ':' + (mntsDivider < 10 ? ('0' + mntsDivider) : mntsDivider);
        var cls3rd = class3Scale ? (':' + (mntsModulo < 10 ? ('0' + mntsModulo) : mntsModulo)) : '';
        return twoClses + cls3rd;
    };
    return FormatData;
}());
var formatData = new FormatData();
var SharedPage = (function () {
    function SharedPage() {
    }
    SharedPage.prototype.operateControls = function () {
        var audioDom = document.getElementById('audio-dom');
        var playArea = document.getElementById('play-area');
        var currentTimeDom = document.getElementById('current-time');
        var fillTimeDom = document.getElementById('fill-time');
        var frontControl = document.getElementsByClassName('front-process-bar')[0];
        var controlMenuf = document.getElementsByClassName('range-fake')[0];
        var playIcon = playArea.getElementsByClassName('iconfont')[0];
        var fillTime;
        var interValNum;
        audioDom.ondurationchange = function () {
            fillTime = audioDom.duration;
            fillTimeDom.innerHTML = formatData.secondFormat(fillTime, 'minutes');
        };
        audioDom.onplay = function () {
            playIcon.className = 'iconfont icon-bofangqizanting';
            intervalCurrentTime();
        };
        audioDom.onpause = function () {
            playIcon.className = 'iconfont icon-bofang';
            clearInterval(interValNum);
        };
        controlMenuf.onchange = function () {
            audioDom.currentTime = this.value / 100 * fillTime;
            audioDom.play();
        };
        controlMenuf.addEventListener('touchmove', changeProcess);
        function changeProcess() {
            audioDom.pause();
            frontControl.style.width = this.value + '%';
            currentTimeDom.innerHTML = formatData.secondFormat(this.value / 100 * fillTime, 'minutes');
        }
        function getCurrentTime() {
            currentTimeDom.innerHTML = formatData.secondFormat(audioDom.currentTime, 'minutes');
            frontControl.style.width = audioDom.currentTime / fillTime * 100 + '%';
        }
        function intervalCurrentTime() {
            interValNum = setInterval(getCurrentTime, 1000);
        }
        playArea.onclick = function () {
            if (audioDom.paused) {
                audioDom.play();
            }
            else {
                audioDom.pause();
            }
        };
    };
    SharedPage.prototype.onInit = function () {
        this.operateControls();
    };
    return SharedPage;
}());
var sharedPage = new SharedPage();
