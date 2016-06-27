class FadeAnimate{
    timeOut: number;
    fadeOut(dom: HTMLElement){
        let delay:number = parseFloat(getComputedStyle(dom, null).transitionDuration)||0.2;
        dom.style.opacity = '0';
        function setHidden(){
            dom.style.display = 'none';
        }
        this.timeOut = setTimeout(setHidden,delay*1000);
    }
    fadeIn(dom: HTMLElement){
        clearTimeout(this.timeOut);
        dom.style.opacity = '0';
        dom.style.display = 'block';
        function setOpacityOne(){dom.style.opacity = '1'};
        setTimeout(setOpacityOne,0);
    }
}
let animate = new FadeAnimate();

class PageIndex{
    menuInterface(){
        let menuIcon: any = document.getElementsByClassName('nav-mobile')[0].getElementsByClassName('menu-area')[0];
        let menuItem: any = document.getElementsByClassName('nav-mobile')[0].getElementsByClassName('menu-area')[0].getElementsByClassName('menu')[0];
        menuIcon.onmouseover = function(){
            console.log('enter');
            animate.fadeIn(menuItem);
        }
        menuIcon.onmouseout = function(){
            console.log('leave');
            animate.fadeOut(menuItem);
        }
    }
    setVideoPlay(){
        let videoDom: any = document.getElementById('video-dom');
        let playMenu: any = document.getElementById('play-menu');
        function playVideo(){
            if(videoDom.paused){
                videoDom.play();
            }else{
                videoDom.pause();
            }
        }
        videoDom.onclick = playVideo;
        playMenu.onclick = playVideo;
        videoDom.onplay = function(){
            animate.fadeOut(playMenu);
            videoDom.removeAttribute('controls');
        }
        videoDom.onpause = function(){
            animate.fadeIn(playMenu);
            videoDom.setAttribute('controls','true');
        }
    }

    pagesChange(){
        let itemPage: any = document.getElementsByClassName('menu')[0].getElementsByTagName('menuitem');
        let sectionDom: any= document.getElementsByClassName('pub-section');
        for(let i = 0;i < itemPage.length;i ++){
            itemPage[i].onclick = function(){
                for(let j = 0; j < sectionDom.length; j ++){
                    sectionDom[j].style.display = 'none';
                }
                animate.fadeIn(sectionDom[i]);
            }
        }
    }

    inite(){
        this.menuInterface();
        this.setVideoPlay();
        this.pagesChange();
    }
}
let indexHome = new PageIndex();
