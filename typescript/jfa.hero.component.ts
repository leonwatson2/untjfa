import {ROUTER_DIRECTIVES} from '@angular/router';

import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NgClass} from '@angular/common';

import {NavigationComponent} from './Navigation/jfa.navigation.component';
import {CheckInComponent} from './checkin/jfa.checkin.component';


import {UserService, HeroService, FacebookService, EventsService} from './services';


@Component({
	selector: 'jfa-hero',
	template: `
<section [ngClass] = "{'mini\-hero': !heroService.home, 'no-hero': heroService.isCheckIn}" id="home-hero">
	<jfa-nav></jfa-nav>
	<div class="content">
		<h1 [innerHtml]="heroService.title"></h1>
		<jfa-checkin [events]="eventsService.currentEvents" *ngIf="heroService.home && eventsService.currentEvents.length"></jfa-checkin>
	</div>
</section>
	`,
  directives: [ROUTER_DIRECTIVES, NavigationComponent, CheckInComponent, NgClass],
  
})

export class HeroComponent {
	public routes;
	public adminRoutes;
	private home:boolean;
	constructor(
				private heroService:HeroService, 
				private facebookService:FacebookService,
				private eventsService:EventsService){
	}
	ngOnInit(){
		this.facebookService.init();
		this.eventsService.currentEvents.length
	}
	
}
