import {UserService} from '../services';

import * as moment from 'moment';

interface IHoldMoments{
	hasValidEndTime():boolean
}
export interface JfaEventType{
	name:string
	id:string | number
}
export interface JfaEvent{
 
  name:string
  description:string
  start_time:string
  end_time:string
  type:number | string
  creator:string
  location:string
  date_created?:string
  number_of_checkins:number | string
  image_url:string
  imageChanged?:boolean
  id?:number | string
  checkins?:any
  imageFromFacebook?:boolean
  hidden?:boolean


}

export interface JfaEventGroup{
	events:JfaEvent[],
	title:string
}
export class DefinedEvent implements JfaEvent, IHoldMoments{
	public name;
	public description;
	public start_time;
	public end_time;
	public type;
	public creator;
	public location;
	public number_of_checkins;
	public image_url;
	public id;
	public checkIns;
	constructor(newEvent){
		this.id = newEvent.id;
		this.name = newEvent.name;
		this.description = newEvent.description;
		this.start_time = newEvent.start_time;
		this.end_time = newEvent.end_time;
		this.type = newEvent.type;
		this.creator = newEvent.creator;
		this.location = newEvent.location;
		this.number_of_checkins = newEvent.number_of_checkins;
		this.image_url = newEvent.image_url;

	}
	isHappening(){
		return moment().isSameOrAfter(this.startMoment, 'minutes') && moment().isSameOrBefore(this.endMoment, 'minutes');
	}
	hasValidEndTime(){
		return moment(this.end_time, 'YYYY-MM-DD HH:mm:ss').isValid();
	}
	get startMoment(){
		return moment(this.start_time);
	}
	get endMoment(){
		return moment(this.end_time);
	}
}

export class TemplateEvent implements JfaEvent{
	public name;
	public description;
	public start_time;
	public end_time;
	public type;
	public creator;
	public location;
	public number_of_checkins;
	public image_url;

	constructor(creator){
		this.name = "A very punny title";
		this.description = "Things that'll go on at this meeting is this and that."
		this.start_time = moment().format('YYYY-MM-DD HH:mm:ss');
		this.end_time = moment().format('YYYY-MM-DD HH:mm:ss');
		this.type = 1;
		this.creator = creator;
		this.location = "Union 101";
		this.number_of_checkins = 0
		this.image_url = "images/templatePhoto.jpg";

	}

}
