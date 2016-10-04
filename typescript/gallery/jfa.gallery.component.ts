import {Component} from '@angular/core';
import {GalleryWallComponent} from './jfa.gallery-wall.component';
import {GalleryAdminComponent} from './jfa.gallery-admin.component';

import {UserService} from '../services';


@Component({
	selector: 'jfa-gallery',
	template: `
	<gallery-admin (editing)="setEditing($event)" *ngIf="userService.isAdmin"></gallery-admin>
	<gallery-wall *ngIf="!isEditing"></gallery-wall>

	`,
  directives: [GalleryWallComponent, GalleryAdminComponent],
  styleUrls:['style/css/gallery.css']
})
export class GalleryComponent {
	numbers :number[];
	isEditing:boolean;
	constructor(private userService:UserService){
		
	}
	ngOnInit(){
		this.isEditing = false;
	}

	setEditing(e){
		this.isEditing = e.isEditing;
	}
	
}
