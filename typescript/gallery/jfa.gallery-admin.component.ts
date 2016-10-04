import {Component, Output, EventEmitter} from '@angular/core';
import {EventPicturesComponent} from './jfa.editable-event-pictures.component';
import {UploadPhotosComponent} from './jfa.upload-photos.component';
import {BooleanWordComponent} from '../misc/jfa.boolean-word.component';

@Component({
	selector: 'gallery-admin',
	template: `
		<div class="edit-buttons">
			<button class="select-all" (click)="choice = 'upload'">
				<span >Upload Photos</span>
			</button>
			<button class="edit" (click)="choice = 'edit'">
				<span >Edit Photos</span>
			</button>
			<button class="edit" (click)="toggleGallery()">
				<bool-word [trueWord]="'Show'" [falseWord]="'Hide'" [bool]="showGallery"></bool-word> Gallery
			</button>
		</div>
		<div [ngSwitch]="choice">
			<upload-photos *ngSwitchCase="'upload'">

			</upload-photos>	
			
			<editable-event-pictures *ngSwitchCase="'edit'">

			</editable-event-pictures>
		</div>
			`,
  directives: [EventPicturesComponent, UploadPhotosComponent, BooleanWordComponent],
  styleUrls:['style/css/edit-photos.css']
})

export class GalleryAdminComponent {
	@Output() editing = new EventEmitter();
	showGallery:boolean;

	ngOnInit(){
		this.showGallery = false;
	}
	toggleGallery(){
		this.showGallery = !this.showGallery;
		this.editing.emit({isEditing:this.showGallery});
	}

}
