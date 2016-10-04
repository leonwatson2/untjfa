import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {HeroService, UserService} from '../services/';


@Component({
	selector: 'jfa-nav-links',
	template: `
				<div
				*ngFor="let route of routes"
				>
				<a 
				[routerLink]="route.path" 
				*ngIf="route.menuName"
				(click)="updatePage(route)"
				>
					<li>
						{{route.menuName}}
					</li>
				</a>
				</div>
	`,
  directives: [ROUTER_DIRECTIVES],
  
})

export class NavigationLinksComponent {
	@Input() routes;
	@Output() toggleNav = new EventEmitter() ;
	constructor(
				private heroService:HeroService,
				private userService:UserService){
	}
	ngOnInit(){
	}

	updatePage(route){
		this.toggleNav.emit({});
		this.heroService.changeTitle(route);
		setTimeout(()=>{this.heroService.smoothScroll(0)}, 250);
	}
	
	logout(){
		this.userService.logout();
	}
	

}
