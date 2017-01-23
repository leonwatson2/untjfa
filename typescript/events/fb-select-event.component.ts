import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FacebookService} from '../services';


@Component({
	selector: 'fb-select-event',
	template: `
			<div class="fb-box">
				<div class="header"><h3>Choose An Event <i class="fa fa-list"></i></h3> </div>
				<div class="list">
					<ul>
						<li *ngFor="let event of events">
							<div (click)="changeCurrentEvent(event)" class="thumb"><img [src]="event.imageUrl" [alt]="event.name" /></div>
							
						</li>
					</ul>
				</div>
				<div class="event-info" [ngClass]="{show: showFbInfo}">
					<div  class="close"><i class="fa fa-remove"></i></div>
					<div class="response">
						<button (click)="showFbInfo=false;" class="reject">Don't Use</button>
						<button (click)="sendEvent(); showFbInfo=false;" class="accept">Use Event</button>
						
					</div>
						<div class="title">
				         <h3>{{currentEvent.name}}</h3>
				       </div>
				        <div class="content">
					        <div class="information">
					          <div class="date">
					            <i class="fa fa-calendar">
					            </i>&nbsp;<span class="calendar-date">{{currentEvent.start_time | utcmoment:'ddd MMM\, Do'}}</span>
					          </div>
					          <div class="time">
					            <i class="fa fa-clock-o"></i>
					            &nbsp;<div class="start-time">
					            {{currentEvent.start_time | utcmoment:'h:mm'}}</div> <span>-</span> <div class="end-time">
					              {{currentEvent.end_time | utcmoment:'h:mma'}}</div>
					           </div>
						        <p class="description" [innerHtml]="currentEvent.description"></p>
				        </div>
				        <div class="photo">
				        	<img [src]="currentEvent.imageUrl" alt="" />
				        </div>
				    </div>
					
				</div>
			</div>
			`,
  styleUrls:['style/css/fb-event-list.css', 'style/css/events.css']
})

export class FbSelectEventComponent{
	@Output('update') fbEvent = new EventEmitter();
	events:any[];
	currentEvent;
	showFbInfo;
	constructor(private fbService:FacebookService){
		this.events = [];
		this.currentEvent = {};
		this.showFbInfo = false;

	}
	
	ngOnInit(){

		this.fbService.getUserEvents().then((r:any[])=>{
			this.events = r;
			console.log(r);
			this.events.forEach((a)=>{
				
				this.fbService.getEventPicture(a.id)
					.then((r:any) =>{
						a.imageUrl = r.data.url;
					});
			});
			
		})

		setTimeout(()=>{
			console.log(this.events);
		}, 2000);

	}
	changeCurrentEvent(event){
		this.currentEvent = event;
		this.showFbInfo = true;
	}
	sendEvent(){
		this.fbEvent.emit(this.currentEvent);
	}
}
