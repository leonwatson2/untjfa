import {Component} from '@angular/core';

import {ROUTER_DIRECTIVES} from '@angular/router';

import {SettingsService} from '../services';

import {InfoComponent} from './jfa.info.component';
import {WhoComponent} from './jfa.who.component';

@Component({
	selector: 'jfa-home',
	template: `	
	<template ngFor let-info [ngForOf]="infos" >
		<jfa-home-info [info]="info"></jfa-home-info>
	</template>
	<jfa-home-who></jfa-home-who>
	`,
  directives: [ROUTER_DIRECTIVES, 
  				WhoComponent, 
  				InfoComponent],
  styleUrls: []
})

export class HomeComponent {
	private infos;

	constructor(private settingsService:SettingsService){
		 settingsService.getHomePageData().subscribe((res) => {
			this.infos = [];
			for (var info in res){
				res[info].id = info;
				this.infos.push(res[info]);	
			}	
		});
	}
	
}
