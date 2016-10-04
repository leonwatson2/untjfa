import {Injectable, Inject} from '@angular/core';
import {DomSanitizationService} from '@angular/platform-browser';

import {HomeComponent} from '../home/jfa.home.component';
import {CheckInBoardComponent} from '../checkin/jfa.checkin-board.component';


import {allRoutes} from '../jfa.routes'
import {Router, ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Injectable()

export class HeroService extends Title{
	public title:any;
	private routes;
	public home:boolean;
    public isCheckIn:boolean;
	constructor(private router:Router,
                private route:ActivatedRoute,
				private sanitizer: DomSanitizationService
				){
        super();
		this.routes = allRoutes;
		this.title = "";
		


	}
	ngOnInit(){
        this.home = false;
        this.isCheckIn = false;
	}
    setTitle(route){
        let newTitle;
        if(this.home){
            newTitle = "JFA | UNT Juggling and Flow Arts";
        }else {
            if(route)
                newTitle = "JFA | " + route.menuName;
        }

        super.setTitle(newTitle);

    }
	changeTitle(route = undefined){
		if(route == undefined){
			let rUrl = this.router.url;
			var paramsIndex = (rUrl.indexOf('?') == -1) ? rUrl.length : rUrl.indexOf('?');
			 route = this.routes.find((i) => {
			 	return i.path.includes(this.router.url.slice(1, paramsIndex))
			 });
		}
       
		if(route){
			this.home = route.name == HomeComponent;
			this.title = this.sanitizer.bypassSecurityTrustHtml(route.title);
		}
        this.setTitle(route);
		return route;
	}


	scrollTo(yPoint: number, duration: number) {
        setTimeout(() => {
           window.scrollTo(0, yPoint)
        }, duration);
        return;
    }
    smoothScroll(elementY:number) {
        var startY = window.scrollY;
        var stopY = elementY;
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            window.scrollTo(0, stopY); 
            return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 40) speed = 40;
        var step = Math.round(distance / 100);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for (var i = startY; i < stopY; i += step) {
                this.scrollTo(leapY, timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for (var i = startY; i > stopY; i -= step) {
            this.scrollTo(leapY, timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
    }
 
	

}