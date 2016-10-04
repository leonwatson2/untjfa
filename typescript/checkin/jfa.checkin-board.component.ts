import {Component, OnDestroy} from '@angular/core';
import {SelfieBoardComponent, CheckInListComponent} from './';

import {JfaEvent} from '../classes/Event';

import {EventsService, CheckInService, HeroService} from '../services';

@Component({
	selector: 'jfa-checkin-board',
	template: `
		<div *ngIf="!eventChosen" class="choose-event">
			<h2>Choose Event</h2>
			<template ngFor let-event [ngForOf]="events">
				<div class="event-choice">
					<button (click)="openEventCheckInBoard(event)">{{event.name}}</button>
				</div>
			</template>
		</div>
		<div *ngIf="eventChosen" class="checkin-board">
			<selfie-board *ngIf="false" [event]="currentBoard"></selfie-board>
			<checkin-list [event]="currentBoard"></checkin-list>
		</div>
			`,
  directives: [SelfieBoardComponent, CheckInListComponent],
  styleUrls:['style/css/checkin-board.css', 'style/css/checkin.css']
})

export class CheckInBoardComponent implements OnDestroy {
	eventChosen:boolean;
	events:JfaEvent[];
	currentBoard:JfaEvent;

	constructor(private checkinService:CheckInService,
				private eventsService:EventsService, 
				private heroService:HeroService){}

	ngOnInit(){

		this.eventChosen = false;
		this.heroService.isCheckIn = true;
		this.events = [
				{
				"name":"A very punny title",
				"start_time":"2016-08-23 13:01:00",
				"end_time":"2016-08-23 16:01:00",
				"description":"Things that'll go on at this meeting is this and that.",
				"number_of_checkins":"0",
				"id":"34",
				"creator":"Leon Watson",
				"type":"2",
				"image_url":"uploads/Events/2016-08-23 13:01:29-bdb179ba3b665fedd9a78adb7317bf8f/mainPhoto.JPG",
				"location":"Union 101",
				"date_created":"2016-08-23 13:01:29"
			},{
				"name":"A very punny title 2",
				"start_time":"2016-08-23 13:01:00",
				"end_time":"2016-08-23 16:01:00",
				"description":"Things that'll go on at this meeting is this and that.",
				"number_of_checkins":"0",
				"id":"30",
				"creator":"Leon Watson",
				"type":"2",
				"image_url":"uploads/Events/2016-08-23 13:01:29-bdb179ba3b665fedd9a78adb7317bf8f/mainPhoto.JPG",
				"location":"Union 101",
				"date_created":"2016-08-23 13:01:29"
			}];

	}
	ngOnDestroy(){
		this.heroService.isCheckIn = false;
	}
	openEventCheckInBoard(event){
		this.eventChosen = true;
		this.currentBoard = event;

	}
}
