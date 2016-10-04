import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NgClass} from '@angular/common';

import {JfaEvent, TemplateEvent} from '../classes/Event';

import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';

import {JFADatePipe, JFAEventTypePipe, JFAFirstWordPipe} from '../pipes';

import {EventsService, UserService, MediaLocation, FacebookService} from '../services';

import {eventFormHtml} from './event-form';
import {FbSelectEventComponent} from './fb-select-event.component'
import {LoadingComponent} from '../misc/jfa.loading.component';

import * as moment from 'moment';


class JfaDate{
	public day;
	public startTime;
	public endTime;

}

@Component({
	selector: 'edit-event',
	template: eventFormHtml,
	directives: [FILE_UPLOAD_DIRECTIVES, NgClass, FbSelectEventComponent],
	pipes:[JFAEventTypePipe, JFADatePipe, JFAFirstWordPipe],
	styleUrls:['style/css/events.css'],
	providers:[LoadingComponent]

})

export class EditEventComponent {
	@Input() event;
	@Output('saved') save = new EventEmitter();
	@Output('deleted') delete = new EventEmitter();
	private _event:JfaEvent;
	private fbEvents;
	private eventTypes = [ ];
	private newDate:JfaDate;
	private newImageName:string;
	private newImageUrl:string;
	private imageTempPath;
	private selectingEventFromFacebook;
	private _imgUploader:FileUploader = new FileUploader({
		url:"api/uploadTemp.php", 
		autoUpload:true, removeAfterUpload:true});
	private saving:boolean;
	private facebookReady = false;

	constructor(private eventService:EventsService,
		private userService:UserService,
		private fbService:FacebookService
		){
		this.newDate = new JfaDate();
	};

	ngOnInit(){
		this.eventService.getEventTypes().subscribe((res) => {
			this.eventTypes = res;
		}); 
		this._event = this.event || new TemplateEvent(this.userService.name);
    //initialize data for editing
    this.newDate.day = moment(this._event.start_time, 'YYYY-MM-DD HH:mm:s').format('Y-MM-DD');
    this.newDate.startTime = moment(this._event.start_time, 'YYYY-MM-DD HH:mm:s').format('H:mm');
    this.newDate.endTime = moment(this._event.end_time, 'YYYY-MM-DD HH:mm:s').format('H:mm'); 
    this.newImageUrl = this._event.image_url;
    this.selectingEventFromFacebook = false;
    this.saving = false;
}

updateImg(e){

    //get file name
    let filePath = e.target.value.split('\\');
    let fileName = filePath[filePath.length - 1];
    this._event.image_url = fileName;
    this._event.imageChanged = true;
    this.newImageName = this.newImageUrl = "uploads/tempPictures/" + fileName;
    this._event.imageFromFacebook = false;

}
tryImageLoad(){
	setTimeout(() => {
		this.newImageUrl = this.newImageName + "?newDate" + new Date();

	}, 2000);

}

updateDetails(event){

	console.log(event);
	this.selectingEventFromFacebook = false;
	this._event.name = event.name;
	this._event.image_url = event.imageUrl;
	this._event.start_time = event.start_time;
	this._event.end_time = event.end_time;
	this._event.description = event.description;
	this._event.location = event.place.name;
}
updateEventType(eventType){
	this._event.type = eventType.id;
}
changeDate(){
	let t = moment(this.newDate.startTime, 'h:mm a');
	this._event.start_time = moment(this.newDate.day + " " + this.newDate.startTime, 'Y-MM-DD H:mm a' ).format("Y-MM-DD H:mm:ss");
	this._event.end_time = moment(this.newDate.day + " " + this.newDate.endTime, 'Y-MM-DD H:mm a' ).format("Y-MM-DD H:mm:ss");

}
deleteEvent(){
	this.delete.emit(true);
}

submitEvent(form){
	this.saving = true;
	this.save.emit(this._event);

}

getDetailsFromFacebook(){
	this.fbService.getUserEvents();
	this.selectingEventFromFacebook = true;
	this._event.imageFromFacebook = true;
	
}
}
