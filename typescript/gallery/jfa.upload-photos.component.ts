import {Component, Output} from '@angular/core';

import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';
import {EventsService, UserService, MediaService, MediaLocation} from '../services';

import {EventPicturesComponent} from './jfa.editable-event-pictures.component';
import {LoadingComponent} from '../misc/jfa.loading.component';

import {JFADatePipe} from '../pipes';

import * as moment from 'moment';

@Component({
	selector: 'upload-photos',
	template: `
			
				<form #photoForm="ngForm" (ngSubmit)="submitPhotos(photoForm.value)">
					<label for="event-name">Choose an Event</label>
					<select required name="event" [(ngModel)]="eventId" id="event-name">
						<option *ngFor="let event of allEvents" [value]="event.id">
							{{event.name}}, {{event.start_time | moment:'ddd MMM\, Do'}}
						</option>
					</select>
					<input type="file" 
						name="the_file" 
						ng2FileSelect
						ng2FileDrop
						multiple
						accept="image/*"
						[uploader]="_imgUploader"
						/>
						<div class="new-photos">
							<div *ngFor="let img of _imgUploader.queue; let i = index" class="new-photo">
								<div *ngIf="false">New Name <input [name]="img.file.name" [(ngModel)]="photoNames[i]" type="text" [value]="img.file.name"/></div>
								<div class="photo" *ngIf="img.file.type.includes('image')">
									<img src="{{tempFileDir}}{{img.file.name}}" (error)="updatePhoto($event)"/>
									
								</div>
								<div class="video" *ngIf="img.file.type.includes('video')">
									<video  alt="" controls src="{{tempFileDir}}{{img.file.name}}" >
									</video>
								</div>
								<div>Progress:{{img.progress}}</div>
								<div ><label>Description </label>
									<textarea id="{{img.file.name}}" name="{{img.file.name}}-description" [(ngModel)]="photoNames['description' + i]" type="text">{{img.file.name}}</textarea>
								</div>
								<button type="button" (click)="_imgUploader.removeFromQueue(img)">Remove</button>
							</div>
						</div>
						<jfa-loading [isOn]="submitting"></jfa-loading>
						<button *ngIf="!submitting">Submit</button>
				</form>
			<hr />
			`,
  directives: [FILE_UPLOAD_DIRECTIVES, LoadingComponent],
  pipes:[JFADatePipe],
  styleUrls:['style/css/gallery.css']
})

export class UploadPhotosComponent {
		photoNames:any = {};
		allEvents;
		eventId;
		tempFileDir = "uploads/tempGalleryPictures/"
		submitting;
		constructor(private eventService:EventsService,
					private userService:UserService,
					private pictureService:MediaService
					){}
		ngOnInit(){
			this.eventService.getEvents().subscribe((events)=>{
				this.allEvents = events;
			});
		}
		private _imgUploader:FileUploader = new FileUploader({
				url:"api/gallery/upload", 
				autoUpload:true, removeAfterUpload:false});
		updatePhoto(e){
			e.preventDefault();
			if(!e.target.oldSrc){
				console.log("yep", e.target.src);
				e.target.oldSrc = e.target.src
			}
			e.target.src = "images/loading.gif";
			setTimeout((t)=>{
				e.target.src = e.target.oldSrc +"?d="+Date.now();
			},3000);
			
		}
		submitPhotos(f){
			var mediaInfo = [];
			for(let pic in this._imgUploader.queue){
				if(!isNaN(Number(pic))){
					mediaInfo.push(this.createMediaInfoObject(pic));
				}
			}
			this.submitting = true;

			this.pictureService.addMediaToGallery(mediaInfo)
				.subscribe((res)=>{
					if(res.status == 201){
						this._imgUploader.clearQueue();
						this.submitting = false;
					}
					else	
						console.warn(res);
				});
		}
		createMediaInfoObject(index){
			return {
						name:this.photoNames[index] || "", 
						description:this.photoNames['description'+index] || "", 
						original_name:this._imgUploader.queue[index].file.name,
						media_type:this._imgUploader.queue[index].file.type,
						uploaded_by:this.userService.name,
						event_id:this.eventId,
						last_modified:moment(this._imgUploader.queue[index]._file.lastModifiedDate).format('YYYY-MM-DD hh:mm:s')
					};
		}
}
