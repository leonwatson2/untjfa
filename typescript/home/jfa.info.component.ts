import {Component, Input} from '@angular/core';

import {DomSanitizationService} from '@angular/platform-browser';

import {SettingsService} from '../services';

@Component({
	selector: 'jfa-home-info',
	template:`	
	<section id="{{id}}">
		<div class="content">
		<div *ngIf="id=='how'" class="promo-img-left">
			<img src="https://scontent-dft4-1.cdninstagram.com/t51.2885-15/e35/14295531_1149735241769034_205130704663609344_n.jpg?ig_cache_key=MTM1MDc5Mjc4NDk1NjY1MTgxNA%3D%3D.2" alt="Juggling Picture" />
		</div>
			<div class="message">
				<h2 [innerHtml]="title"></h2>
				<p [innerHtml]="text"></p>
			</div>
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
