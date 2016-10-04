import {Component} from '@angular/core';
import {GalleryEditComponent} from './jfa.gallery-edit.component';

import {MediaService} from '../services';

@Component({
	selector: 'editable-event-pictures',
	template: `
		<div [ngSwitch]="currentEvent">
			<div class="edit-event">
				<h3>Choose an Event</h3>
				<template ngFor let-event [ngForOf]="events">
						<button type="button" (click)="currentEvent=event.id">{{event.name}}</button>
				</template>
			</div>
			<template ngFor let-group [ngForOf]="events" let-i="index">

	    			<gallery-edit *ngSwitchCase="group.id" (update)="updateMedia()" [photos]="group.media" [photosId]="group.name"></gallery-edit>
			</template>
		</div>
		<hr />
			`,
  directives: [GalleryEditComponent],
  styleUrls:['style/css/gallery.css']
})

export class EventPicturesComponent {
	private currentEvent;
	private events;
	constructor(private mediaService:MediaService){}
	ngOnInit(){
		this.updateMedia();
    }
	
	updateMedia(){
		this.mediaService.getMedia()
		        .subscribe((res)=>{
		          if(this.events !== res.events)
		            this.events = res.events;
		        });
	}
}
