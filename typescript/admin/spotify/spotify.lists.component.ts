import {Component, Input, Output, EventEmitter} from '@angular/core';


@Component({
	selector: 'spotify-lists',
	template: `
			<h2>Lists</h2>
			<div class="edit-buttons">
				<template ngFor let-list [ngForOf]="lists" let-index="index">
					<button 
						[ngClass]="{'active':activeList == index}"
						class = "confirm"
						(click)="activeList=index" 
						[innerHtml]="list.name"></button>
				</template>
			</div>

			<template ngFor let-list [ngForOf]="lists" let-index="index">
				<figure *ngIf="activeList == index">
					<spotify-list-item
						[list]="list" 
						(onAddSong)="editList($event, true)" 
						(onDenySong)="editList($event, false)"
					>
						
					</spotify-list-item>		
				</figure>
			</template>
			`,
  styleUrls: ['style/css/spotify.css', 'style/css/confirm-modal.css', 'style/css/events.css']
})

export class SpotifyListsComponent {
	@Input() lists;
	@Output('onUpdate') updateLists = new EventEmitter();
	activeList:Number = 0;

	ngOnInit(){
		
	}
	ngOnChanges(){
		// console.log(this.lists);
	}

	editList(suggestions:iSpotifySuggestion[], addSong:boolean){
		this.updateLists.emit({suggestions:suggestions, addSong:addSong})
	}
	
}
