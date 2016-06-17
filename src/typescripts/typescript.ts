/// <reference path="./jquery.d.ts" />


class globalMethod {
	private initNumber: number = 0;
	numPlus(num: number): number {
		this.initNumber += num;
		return this.initNumber;
	}
	numMinus(num: number): number {
		this.initNumber -= num;
		return this.initNumber;
	}
	getNum():number{
		return this.initNumber;
	}
	setNum(num:number):number{
		this.initNumber = num;
		return this.initNumber;
	}


	constructor() {

	}
}


class PublicMethod {
	constructor() {

	}
}


class PagesMethod {
	index(): void {
		let glbMtd = new globalMethod();
		let newMtd = new globalMethod();
		function setVideoDisplay(element:JQuery):void{
			element.css({
				'margin-left': 100 * glbMtd.getNum() + '%'
			})
		}
		function displayVideo(): void {
			$('.video-block .right-direct').on('click', function () {
				let transformDiv = $('.videos-display .videos-container');
				glbMtd.numMinus(1)<-2?glbMtd.numPlus(1):glbMtd.getNum();
				setVideoDisplay(transformDiv);
			})
			$('.video-block .left-direct').on('click', function () {
				let transformDiv = $('.videos-display .videos-container');
				glbMtd.numPlus(1)>0?glbMtd.numMinus(1):glbMtd.getNum();
				setVideoDisplay(transformDiv);
			})
		}
		
		function displayPages(){
			let pagesSection:JQuery = $('.body-main');
			let navALink: JQuery = $('.nav-direct a'); 
			let enScroll: boolean = true;
			function pagesTramsform(element:JQuery){
				element.css({
					'top': 100 * newMtd.getNum() + '%'
				});
			}
			$('body').mousewheel(
				function(event, delta, deltaX, deltaY) {
					console.log(enScroll);
					if(delta > 0 && enScroll){
						newMtd.numPlus(1)>0?newMtd.numMinus(1):newMtd.getNum();
						pagesTramsform(pagesSection);
						setNavActived();
						enScroll = false;
					}else if(enScroll){
						newMtd.numMinus(1)<-2?newMtd.numPlus(1):newMtd.numMinus(0)
						pagesTramsform(pagesSection);
						setNavActived();
						enScroll = false;
					}
					if(!enScroll){
						let delaySet = setTimeout(function() {
							enScroll = true;
						}, 500);
					}
					
			});
			function setNavActived(){
				let num = -newMtd.getNum();
				console.log(num);
				if(!navALink.eq(num).hasClass('actived')){
					navALink.removeClass('actived');
					navALink.eq(num).addClass('actived');
				}
				
			}
			function setNavLink(to:number){
				newMtd.setNum(to);
				pagesTramsform(pagesSection);
			};
			function setLinkTo(){
				$('.nav-direct a').each(function(index){
					$(this).click(function(){
						setNavLink(-index);
						setNavActived();
					})
				})
			}
			setLinkTo();
		}
		
		displayVideo();
		displayPages();
	}
	constructor() {
		
	}
}
let pgsMtd = new PagesMethod();