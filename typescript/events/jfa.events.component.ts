import {Component} from '@angular/core';
import {EventsService, UserService} from '../services/'
import {EventComponent} from './jfa.event.component';


import {JfaEvent, JfaEventGroup, DefinedEvent} from '../classes/Event';

import {EditEventComponent} from './jfa.event-edit';
import {EventGroupComponent} from './jfa.event-group.component';

import * as moment from 'moment';


import {JFAFirstWordPipe} from '../pipes';


// ********Change back to is admin for add event button


@Component({
  selector: 'jfa-events',
  template: `
  <div class="main">
    <button *ngIf="!isCreatingEvent && userService.isAdmin" class="add-event" (click)="toggleAddEvent()">Add Event</button>
    <button *ngIf="isCreatingEvent && userService.isAdmin" class="add-event" (click)="toggleAddEvent(false)">Cancel Add Event</button>
    <div *ngIf="isCreatingEvent" class="card event">  
      <edit-event (saved)="addEvent($event)"></edit-event>
    </div>
    <template ngFor let-eventGroup [ngForOf]="eventGroups" [ngForTrackBy]="title">
      <jfa-event-group (changed)="updateEvents()" [eventGroup]="eventGroup"></jfa-event-group>
    </template>
    
`,
  directives: [EventComponent, EditEventComponent, EventGroupComponent],
  pipes:[JFAFirstWordPipe],
  styleUrls:['style/css/events.css']
  
})

export class EventsComponent {
  public eventGroups:JfaEventGroup[];
  public isCreatingEvent:boolean;

  constructor(private eventsService:EventsService,
              private userService:UserService){
  
  };

  ngOnInit(){
    this.updateEvents();
  }

  addEvent(event){
    console.log(event);
    this.eventsService.addEvent(event).subscribe((res)=>{
      if(res.status == 201)
        this.updateEvents();
        this.toggleAddEvent(false);
    });
  }
  updateEvents(){
    this.eventsService.getEvents().subscribe((events) => {
      
      let newEvents = this.eventsService.getUpcomingEvents(events);
      let oldEvents = this.eventsService.getOldEvents(events);
      this.eventsService.sortEvents(newEvents);  
      this.eventsService.sortEvents(oldEvents);
      this.eventGroups = [
                          {title:"Upcoming Events", events:newEvents}, 
                          {title:"Past Events", events:oldEvents.reverse()}
                          ];

    });
  }
  
  toggleAddEvent(add = true){
    this.isCreatingEvent = add;
  }
  
  
 getNextMeeting(events:JfaEvent[]){
   if(events.length <= 0) return null;
     var closestEvent = events[0];
     var closestEventTime = moment(events[0].start_time, 'YYYY-MM-DD');
     for(let event of events){
       let eventTime = moment(event.start_time, 'YYYY-MM-DD HH:mm:ss');
       if(closestEventTime.isSameOrAfter(eventTime, 'hour')){
         closestEvent = event;
         closestEventTime = moment(event.start_time, 'YYYY-MM-DD');
       }
     }
 }
}


