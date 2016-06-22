class FadeAnimate{
    timeOut: number;
    fadeOut(dom: HTMLBaseElement){
        let delay:number = parseFloat(getComputedStyle(dom, null).transitionDuration)||0.2;
        dom.style.opacity = '0';
        function setHidden(){
            dom.style.display = 'none';
        }
        this.timeOut = setTimeout(setHidden,delay*1000);
    }
    fadeIn(dom: HTMLBaseElement){
        clearTimeout(this.timeOut);
        dom.style.opacity = '0';
        dom.style.display = 'block';
        dom.style.opacity = '1';
    }
}
let animate = new FadeAnimate();

class PageIndex{
    menuInterface(){
        let menuIcon: any = document.getElementsByClassName('nav-mobile')[0].getElementsByClassName('menu-area')[0];
        let menuItem: any = document.getElementsByClassName('nav-mobile')[0].getElementsByClassName('menu-area')[0].getElementsByClassName('menu')[0];
        menuIcon.onmouseenter = function(){
            console.log('enter')
            animate.fadeIn(menuItem);
        }
        menuIcon.onmouseleave = function(){
            console.log('leave')
            animate.fadeOut(menuItem);
        }
    }
    inite(){
        this.menuInterface();
    }
}
let indexHome = new PageIndex();
