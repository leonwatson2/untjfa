import {Component, Input, Output, EventEmitter} from '@angular/core';

import {MediaService} from '../services';

import {BooleanWordComponent} from '../misc/jfa.boolean-word.component';

@Component({
	selector: 'gallery-edit',
	template: `
			<div class="edit-buttons">
				<button class="edit" *ngIf="!editing" (click)="editing = true">Edit Pictures</button>
				<span *ngIf="editing">
					<button class="edit"  (click)="editing = false; selectedMedia=[]">Cancel Edit</button>
					<button (click)="deleteMedia()" class="delete">Delete <i class="fa fa-trash"></i></button>
					<button [disabled]="animating" *ngIf="!allMediaItemsSelected()" (click)="selectAll()" class="select-all">Select All </button>
					<button [disabled]="animating" *ngIf="allMediaItemsSelected()" (click)="selectAll(false)" class="select-all">Deselect All </button>
				</span>
				<span *ngIf="editing" style="margin-left:10px"> 
					<bool-word [bool]="selectedMedia.length <= 0" trueWord="No" [falseWord]="selectedMedia.length"></bool-word> 
						<bool-word [bool]="!selectedMedia != 1" trueWord="photos" falseWord="photo"></bool-word>
						selected
				</span>
			</div>
			<div class="photo-edit-container">
				<div 
					(click)="togglePhoto(photo)" 
					[ngClass] = "{
								selected:selectedMedia.includes(photo), 
								dark:(currentAnimationPhoto + 3== photos.indexOf(photo) && editing),
								darker:(currentAnimationPhoto + 2 == photos.indexOf(photo) && editing),
								darkest:(currentAnimationPhoto + 1 == photos.indexOf(photo) && editing)
								}" 
					*ngFor="let photo of photos trackBy:photo?.id" class="photo">
					<img style="width:100%; height:auto;" [src]="photo.thumbnailUrl"/>
				</div>
			</div>
			`,
  directives: [BooleanWordComponent],
  styleUrls:['style/css/edit-photos.css']
})

export class GalleryEditComponent {
	@Input() photos:any[];
	@Input() photosId;
	@Output() update = new EventEmitter(); 
	private editing ;
	private selectedMedia:any[];
	private animating;
	private currentAnimationPhoto;
	constructor(private mediaService:MediaService){
		this.editing = false;
		this.selectedMedia = [];
		this.animating = false;
		this.currentAnimationPhoto = -4;
	}
	deleteMedia(){
		if(this.selectedMedia.length == 0) return;
		this.mediaService.deleteMedia(this.selectedMedia)
			.subscribe((res)=>{
				if(res.status == 201){
					this.update.emit({});
				}else {
					console.log(res);
				}
			});
	}
	togglePhoto(p, remove = false){
		if(!this.editing) return;
		let index = this.selectedMedia.indexOf(p);
		if(this.selectedMedia.includes(p) || remove){
			this.selectedMedia.splice(index, 1)
		}else if(!this.allMediaItemsSelected())
			this.selectedMedia.push(p);
	}

	allMediaItemsSelected(){
		return this.selectedMedia.length >= this.photos.length;
	}
	selectAll(addAll = true){
		this.animating = true;
		let delay = (this.photos.length < 30) ? 80 : 30; 
		if(addAll && !this.allMediaItemsSelected()) 
			this.photos.forEach((p, i, a) => {
					setTimeout(()=>{ 
						this.currentAnimationPhoto = i;
						this.selectedMedia.push(p);
						if(i == this.photos.length - 1){
							this.animating = false;
							this.currentAnimationPhoto = -4;
						}
					}, i*delay)
					 
			});
		else if(!addAll)
			this.photos.forEach((p, i, a) => {
					setTimeout(()=>{ 
						var currentIndex = a.length-1-i;
						this.currentAnimationPhoto = currentIndex;
						this.togglePhoto(a[a.length-1-i], true);
						if(i == this.photos.length - 1){
							this.animating = false;
							this.currentAnimationPhoto = -4;
						}
					}, i*delay)
					; 
			})
	}


	ngOnInit(){
		
	}

}
	