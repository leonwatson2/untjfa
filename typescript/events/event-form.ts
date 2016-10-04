export let eventFormHtml = 
`<form  class="editing" #eventForm="ngForm" (ngSubmit)="submitEvent(eventForm.value)">
	<div class="title">
		<h3>
		<input type="text" 
		name="name" 
		[(ngModel)]="_event.name" 
		/>
		</h3>
		<button class="delete" (click)="deleteEvent()" type="button">Delete</button>
	</div>
	<div class="event-types radio-group">
		<div *ngFor="let eventType of eventTypes;" class="{{eventType.name}}">
			<input 
			id="{{eventType.name}}-{{_event.id}}"
			type="radio" 
			name="event-type"
			[value]="eventType.id"
			(click)="updateEventType(eventType)" 
			>

			<label tabindex="0" 
			[ngClass]="{active: _event.type == eventType.id}" 
			htmlFor="{{eventType.name}}-{{_event.id}}">
			<span>{{eventType.name}}</span>
			</label>    
		</div>
	</div>
	<div class="content">
		<div class="information">
			<div class="date">
				<i class="fa fa-calendar"></i>
				
				<input type="date" 
				(change)="changeDate()"  
				[(ngModel)]="newDate.day"
				name="day"
				/>
				
			</div>
		<div class="time">
			<i class="fa fa-clock-o">
			</i>
			<div class="start-time">
				<input type="time" 
				(change)="changeDate()"  
				[(ngModel)]="newDate.startTime" 
				name="startTime"
				/>
			</div> 
			<span> &#8211; </span> 
			<div class="end-time">
				<input type="time" 
				(change)="changeDate()" 
				[(ngModel)]="newDate.endTime" 
				name="endTime"
				/>
			</div>
		</div>
		<div class="location"> 
			<i class="fa fa-map"></i> 
			<input type="text" 
			name="location"
			[(ngModel)]="_event.location"/>
			</div>
		</div>
		<div class="photo">
			<img (error)="tryImageLoad()" [src]="newImageUrl" alt="" />
			<input type="file" 
			name="the_file" 
			(change)="updateImg($event)"
			ng2FileSelect
			accept="image/*, video/*"
			[uploader]="_imgUploader"
			/>
			<div *ngFor="let img of _imgUploader.queue">
			<div>Prog:{{img.progress}}</div>
			<button (click)="img.upload()">Upload</button>

		</div>
	</div>
	
	<textarea  class="description" name="description" [(ngModel)]="_event.description">
	</textarea>
	</div>
	<div class="footer"> 
		<div class="created-by">Created By: Leon Watson, You: <span [innerHtml]="userService.name | firstword"></span></div>
		<div *ngIf="facebookReady" class="facebook">
			<button name="facebook" type="button" (click)="getDetailsFromFacebook();"> <i class="fa fa-facebook"></i> Add from facebook. </button>
		</div> 
		<div class="save">
			<input name="submit" type="submit" value="Save">
			<jfa-loading [isOn]="saving"></jfa-loading>
		</div> 
	</div>
</form>
<fb-select-event *ngIf="selectingEventFromFacebook" (update)="updateDetails($event)" [events]="fbEvents"></fb-select-event>
`;
