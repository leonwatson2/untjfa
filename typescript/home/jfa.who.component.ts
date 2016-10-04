import {Component} from '@angular/core';

import {DomSanitizationService} from '@angular/platform-browser';

import {SettingsService} from '../services';

/*Move to class folder*/
interface Video{
	title:string,
	name:string,
	videoUrl:string,
	posterUrl:string
}


@Component({
	selector: 'jfa-home-who',
	template:`
	<section id="who">
			<h2>{{title}}<small>{{subtitle}}</small></h2>
			<div class="videos">
				<div class="video" *ngFor="let video of videos">
					<div class="name">{{video.title}} <small>{{video.name}}</small></div>
					<video muted loop [poster]="video.posterUrl">
						<source *ngIf="video.videoUrl" [src]="video.videoUrl">
					</video>
				</div>
			</div>
	</section>
	`,
	directives: [],
	styleUrls: []
})

export class WhoComponent {
	private officers;
	private title;
	private subtitle;
	private videos:Video[];
	constructor(private sani:DomSanitizationService,
				private settingsService:SettingsService){
	}
	ngOnInit(){
		this.settingsService.getOfficerData().subscribe((res)=>{
			let page = res;
				this.videos = [];
				this.title = page.title;
				this.subtitle = page.subtitle;
				this.videos = page.officers['officer'];
			}
		);

	}
	
}
