class FormatData {
    secondFormat(seconds: number, type: string): string {
        let scds: number = 1;
        let mnts: number = 60 * scds;
        let hrs: number = 60 * mnts;
        let class1Scale: number = 1;
        let class2Scale: number = 1;
        let class3Scale: number = 1;
        if (type === 'hours') {
            class1Scale = hrs;
            class2Scale = mnts;
            class3Scale = scds;
        } else if (type === 'minutes') {
            class1Scale = mnts;
            class2Scale = scds;
            class3Scale = NaN;
        }
        let hrsDivider: number = parseInt((seconds / class1Scale).toString());
        let hrsModulo: number = seconds % class1Scale;
        let mntsDivider: number = parseInt((hrsModulo / class2Scale).toString());
        let mntsModulo: number = hrsModulo % class2Scale;
        let twoClses = (hrsDivider < 10 ? ('0' + hrsDivider) : hrsDivider) + ':' + (mntsDivider < 10 ? ('0' + mntsDivider) : mntsDivider);
        let cls3rd = class3Scale ? (':' + (mntsModulo < 10 ? ('0' + mntsModulo) : mntsModulo)) : '';
        return twoClses + cls3rd;
    }
}
let formatData = new FormatData();

class SharedPage {
    operateControls(): void {
        let audioDom: any = document.getElementById('audio-dom');
        let playArea: any = document.getElementById('play-area');
        let currentTimeDom: any = document.getElementById('current-time');
        let fillTimeDom: any = document.getElementById('fill-time');
        let frontControl: any = document.getElementsByClassName('front-process-bar')[0];
        let controlMenuf: any = document.getElementsByClassName('range-fake')[0];
        let playIcon: any = playArea.getElementsByClassName('iconfont')[0];
        let fillTime: number;
        let interValNum: number;
        audioDom.ondurationchange = function () {
            fillTime = audioDom.duration;
            fillTimeDom.innerHTML = formatData.secondFormat(fillTime, 'minutes');
        }
        audioDom.onplay = function () {
            playIcon.className = 'iconfont icon-bofangqizanting';
            intervalCurrentTime();
        }
        audioDom.onpause = function () {
            playIcon.className = 'iconfont icon-bofang';
            clearInterval(interValNum);
        }
        controlMenuf.onchange = function () {
            audioDom.currentTime = this.value / 100 * fillTime;
            audioDom.play();
        }

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
            } else {
                audioDom.pause();
            }
        }
    }

    onInit(): void {
        this.operateControls();
    }
}
let sharedPage = new SharedPage();