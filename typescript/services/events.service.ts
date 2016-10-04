import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {JfaEvent, JfaEventType, DefinedEvent} from '../classes/Event';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as moment from 'moment';


@Injectable()

export class EventsService{
	private apiLocation = 'api';
	private _events:JfaEvent[];
	private _currentEvents:JfaEvent[];
	private intervalUpdateId:NodeJS.Timer;
	public eventTypes:JfaEventType[];
	constructor(private http:Http){
		this.getEventTypes().subscribe(()=>{});
		this.getEvents().subscribe(events => {  
			this._events = events;
		});
			this._getEvents().subscribe();
		
			this.intervalUpdateId = setInterval(()=>{
				this._getEvents().subscribe();
			}, 5000);
		
	}

	getEvents(){
			return this.http.get(`${this.apiLocation}/events`)
				.map(res => {
					this._events = res.json().events;
					return this.events;
				});
			
	}
	_getEvents(){
		return this.http.get(`${this.apiLocation}/events`)
				.map(res => {
					this._events = res.json().events;
					this.currentEvents = this.getCurrentEvents(this.events);
							
					return res;
				});
	}
	getEventTypes(){
		return this.http.get(`${this.apiLocation}/events/types`)
		.map(res =>{
			this.eventTypes = res.json().eventTypes;
			return res.json().eventTypes;
		});
	}
	addEvent(newEvent){
		return this.http.post(`${this.apiLocation}/events/add`, JSON.stringify(newEvent))
						.map(res => {
							return res.json();
						})
						
	}
	updateEvent(event){
		return this.http.put(`${this.apiLocation}/events`, JSON.stringify(event))
					.map( res => {
						return res.json();
					});
	}
	deleteEvent(event){
		return this.http.delete(`${this.apiLocation}/events/${event.id}`)
					.map(res => {
						return res.json();
					});
	}
	sortEvents(events:JfaEvent[]){
		events.sort((a, b) => {
          return (a.start_time > b.start_time) ? 1 : -1
      });
  	}
  	getCurrentEvents(events:JfaEvent[]){
  		let curEvents = events.filter((event)=>{
  			let startMoment = moment(event.start_time, 'YYYY-MM-DD H:mm:s');
  			let endMoment = moment(event.end_time, 'YYYY-MM-DD H:mm:s');
  			return moment().isBetween(startMoment, endMoment, 'minutes', '[)');
  		});
  		return curEvents;
  	}
  	getOldEvents(events){
    return events
            .filter((event) => moment().isAfter(moment(event.start_time, 'YYYY-MM-DD'), 'day'))
            .map((event)=> new DefinedEvent(event));
	  }
	  getUpcomingEvents(events){
	    return events
	            .filter((event) => moment().isSameOrBefore(moment(event.start_time, 'YYYY-MM-DD'), 'day'))
	            .map((event)=> new DefinedEvent(event));
	  }
	  
  	get events(){
  		return this._events;
  	}
  	set currentEvents(e){
  		if(this._currentEvents != e){
  			
	  		this._currentEvents = e;
  		}
  	}
  	get currentEvents(){
  		return this._currentEvents || [];
  	}
}