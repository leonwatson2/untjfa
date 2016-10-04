import {ROUTER_DIRECTIVES} from '@angular/router';
import {NgClass} from '@angular/common';

import {Component} from '@angular/core';
import {publicRoutes, memberRoutes, adminRoutes} from '../jfa.routes';


import {HeroService, UserService} from '../services';
import {NavigationLinksComponent} from './jfa.navigation-links.component';

@Component({
	selector: 'jfa-nav',
	template: `
		<div class="nav-container">
			<a [routerLink]="['/']" class="logo" (click)="changeTitle(routes[0])">
				<img src="references/logo.png" alt="Juggling and Flow Arts Logo"/>
			</a>
			<input type="checkbox" id="nav-toggle" #navToggle/>
			<label class="nav-trigger" for="nav-toggle"><span></span></label>
			<ul class="nav">
				<jfa-nav-links (toggleNav)="toggleNav(navToggle)" [routes]="userService.userRoutes"></jfa-nav-links>
				<a *ngIf="userService.isLoggedIn" (click)="logout(); toggleNav(navToggle)"><li>Logout</li></a>
			</ul>
		</div>
	`,
  directives: [ROUTER_DIRECTIVES, NavigationLinksComponent],
  
})

export class NavigationComponent {
	public routes;
	private home:boolean;

	constructor(
				private heroService:HeroService,
				private userService:UserService){
		
	}

	ngOnInit(){
		//because router is not updated until full page load
		setTimeout(()=>{this.changeTitle(); }, 50);
		this.routes = publicRoutes;
	}

	changeTitle(route = undefined){
		this.heroService.changeTitle(route);
	}
	
	toggleNav(nav){
		nav.checked = false;
	}
	logout(){
		this.userService.logout();
	}
	


}
