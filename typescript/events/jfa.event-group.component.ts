import {Component, Input, Output, EventEmitter} from '@angular/core';
import {EventComponent} from './jfa.event.component';

import {JfaEventGroup} from '../classes/Event';
import {EventsService, UserService} from '../services';


@Component({
	selector: 'jfa-event-group',
	template: `
	<div class="upcoming-events">
	 <h2 class="text-center">{{eventGroup.title}}</h2>
		<template ngFor let-event [ngForOf]="eventGroup.events" [ngForTrackBy]="id"> 
	  		<jfa-event *ngIf="!event.hidden || userService.isAdmin" [event]="event" (delete)="eventChange()" (saved)="eventChange()"></jfa-event>  
		</template>
	</div>
			`,
  directives: [EventComponent],
  styleUrls: ['style/css/events.css']
})

export class EventGroupComponent {
	@Input() eventGroup:JfaEventGroup;
	@Output() changed = new EventEmitter();

	constructor(private eventsService:EventsService,
				private userService:UserService){}

	ngOnInit(){	}

	eventChange(){
	   	
	    this.changed.emit({});
	    	
  }
}
