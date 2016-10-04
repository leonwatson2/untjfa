import {Component} from '@angular/core';
import {CheckInListComponent} from './jfa.checkin-list.component';
import {CheckInListAllComponent} from './';
import {EventsService} from '../services';
import {JFADatePipe, JFAEventTypePipe} from '../pipes';


import {JfaEvent, JfaEventGroup, DefinedEvent} from '../classes/Event';

@Component({
	selector: 'checkin-listings',
	template: `
		<div class="checkin-listing-container">
			<checkin-list-all *ngIf="allCheckIns" class="card"></checkin-list-all>
			<h2 *ngIf="eventGroups.length > 0 && !eventChosen ">Choose An Event</h2>
			<button (click)="showAllCheckIns()">Show all check ins</button>
			
			<template ngFor let-eventGroup [ngForOf]="eventGroups" [ngForTrackBy]="title">
		      <h2 *ngIf="eventGroup.events.length" class="text-center">{{eventGroup.title}}</h2>
				<div class="event-list-buttons">
			      <template ngFor let-event [ngForOf]="eventGroup.events">
						<button (click)="setChosenEvent(event)" class="select">
							{{event.name}} 
							<div>{{event.start_time | moment:'MMM DD\,YYYY'}}</div>
						</button>
			      </template>
				</div>
		    </template>
		
		</div>
			<checkin-list class="main" *ngIf="eventChosen" [event]="chosenEvent"></checkin-list>
			`,
  directives: [CheckInListComponent, CheckInListAllComponent],
  pipes:[JFADatePipe, JFAEventTypePipe],
  styleUrls:['style/css/checkin-list.css']
})

export class CheckInListingsComponent {
	eventGroups:JfaEventGroup[];
	chosenEvent:JfaEvent;
	eventChosen:boolean;
	allCheckIns:boolean;

	constructor(private eventsService:EventsService){
		this.updateEvents();
	}
	ngOnInit(){
		this.eventGroups = [];
		this.eventChosen = false;
		this.allCheckIns = false;
	}

	updateEvents(){
	    this.eventsService.getEvents().subscribe((events) => {
	      
	      let oldEvents = this.eventsService.getOldEvents(events);
	      let curEvents = this.eventsService.getCurrentEvents(events);
	      this.eventsService.sortEvents(curEvents);  
	      this.eventsService.sortEvents(oldEvents);
	      this.eventGroups = [
	                          {title:"Current Events", events:curEvents}, 
	                          {title:"Past Events", events:oldEvents.reverse()}
	                          ];

	    });
  }
  setChosenEvent(event){
  	this.chosenEvent = event;  
  	this.eventChosen = true;
  	this.allCheckIns = false;
  }
  showAllCheckIns(){
  	this.eventChosen = false;
  	this.allCheckIns = true;
  }
}
	