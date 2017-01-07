import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GalleryGroupComponent} from './jfa.gallery-group.component';
import {JFADatePipe} from '../pipes';
import {MediaService} from '../services';
import * as moment from 'moment';


interface JfaPhotoGroup{
	name:string
	date:string
	  id:number | string
	media:JfaPhoto[]
}
interface JfaPhoto{
  id?:number | string
  name:string
  originalName:string
	url:string
	thumbnailUrl:string
	description?:string
	uploadedBy?:string
  dateUploaded?:string
}

@Component({
	selector: 'gallery-wall',
	template: `
			<div [ngSwitch]="selectedGroup" class="wall-container">
				<template ngFor let-group [ngForOf]="photoGroups" let-i="index">
	    			<gallery-group *ngSwitchCase="group.id" [photos]="group.media" [photosId]="group.name"></gallery-group>
				</template>
	    		
	    		<div class="event-select">
	    			<h3 *ngIf="photoGroups?.length == 0" style="text-align:center;">No Photos Yet!</h3>
					<template ngFor let-group [ngForOf]="photoGroups" let-i="index">
						<div *ngIf="group.media[0]" class="photo card" (click)="setSelectedGroup(group.id)">
							<img [src]="group.media[0].thumbnailUrl" alt="" />
							<span class="name">{{group.date | moment:'MMM Do\, Y'}}</span>
							<span class="name">{{group.name}}</span>
						</div>
					</template>
	    		</div>
			</div>
			`,
  directives: [GalleryGroupComponent],
  pipes:[JFADatePipe],
  styleUrls:['style/css/gallery.css']
})

export class GalleryWallComponent {
	photoGroups:JfaPhotoGroup[];
  	selectedGroup:string;
  constructor(private mediaService:MediaService, 
  				private route:ActivatedRoute){

  }
	ngOnInit(){
    	this.getPhotos();
    	this.route.params.subscribe((parameters)=>{
    		if(parameters["id"]){
    			this.setSelectedGroup(parameters["id"])
    		}
    	})
	}	
  getPhotos(){
    this.mediaService.getMedia()
        .subscribe((res)=>{
          if(this.photoGroups !== res.events)
            this.photoGroups = res.events;
        console.log(this.photoGroups);
        });}
     setSelectedGroup(id){
     	this.selectedGroup = id;
     }

}
	