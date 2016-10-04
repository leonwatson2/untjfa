import {Component, Input} from '@angular/core';

import {DefinedEvent} from '../classes/Event';

import {JFADatePipe, JFAEventTypePipe} from '../pipes';

import {UserService, MediaService} from '../services';


@Component({
	selector: 'display-event',
	template: `
		<div class="title">
         <h3>{{event.name}}</h3>
         <span class="type">{{event.type | eventname}}</span>
       </div>
        <div class="content">
        <div class="information">
          <div class="date">
            <i class="fa fa-calendar">
            </i>&nbsp;<span class="calendar-date">{{event.start_time | moment:'ddd MMM\, Do'}}</span>
          </div>
          <div class="time">
            <i class="fa fa-clock-o"></i>
            &nbsp;
            <div *ngIf="!event.hasValidEndTime()" class="start-time">
              {{event.start_time | moment:'h:mma'}}
            </div>  
            <div *ngIf="event.hasValidEndTime()" class="start-time">
              {{event.start_time | moment:'h:mm'}}
            </div>  
            <div *ngIf="event.hasValidEndTime()" class="end-time"><span>-</span>
              {{event.end_time | moment:'h:mma'}}</div>
           </div>
          <div class="location">
            <i class="fa fa-map"></i>
            <span>{{event.location}}</span>
          </div>
        </div>
        <div class="photo"><img [src]="event.image_url" alt="" /></div>
        <p  class="description" [innerHtml]="event.description"></p>
        </div>
        <div class="footer"> 
          <div *ngIf="userService.isAdmin" class="created-by">Created By: {{event.creator}}</div>
          <div class="share"><i class="fa fa-3x fa-share-alt"></i>
          </div> 
        </div>
			`,
  directives: [],
  pipes:[JFADatePipe,JFAEventTypePipe],
  styleUrls:['style/css/events.css']
  
})

export class DisplayEventComponent {
	@Input() event:DefinedEvent;
  constructor(private userService:UserService){

  }
}
