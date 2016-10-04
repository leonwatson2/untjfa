import {Component, Input} from '@angular/core';

import {DomSanitizationService} from '@angular/platform-browser';

import {SettingsService} from '../services';

@Component({
	selector: 'jfa-home-info',
	template:`	
	<section id="{{id}}">
		<div class="content">
			<h2 [innerHtml]="title"></h2>
			<p [innerHtml]="text"></p>
		</div>
	</section>
	`,
  directives: [],
  styleUrls: []
})

export class InfoComponent {
	@Input() info;
	private title;
	private text;
	private id;
	constructor(private settingsService:SettingsService){
		
	}
	ngOnInit(){
		this.id = this.info.id;
		this.title = this.info.title;
		this.text = this.info.text;

	}
}
