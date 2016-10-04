import {Pipe} from '@angular/core';
import {EventsService} from '../services';
@Pipe({
	name:'eventname'
})


export class JFAEventTypePipe{
	constructor(private eventsService:EventsService){}
	transform(pipeData, pipeModifier){
		let eventTypes = this.eventsService.eventTypes || 
			[{"name":"Fire Night","id":"1"},
				{"name":"Meeting","id":"2"},
				{"name":"Flow Jam","id":"3"},
				{"name":"Volunteering","id":"4"},
				{"name":"Performance","id":"5"}
				];
		
		for(let eventType of eventTypes){
			if(eventType.id == pipeData){
				return eventType.name;
			}
		}
	}
}