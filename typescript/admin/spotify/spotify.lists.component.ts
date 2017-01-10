import {Component, Input, Output, EventEmitter} from '@angular/core';
import {SpotifyListItemComponent} from './';


@Component({
	selector: 'spotify-lists',
	template: `
			<h2>Lists</h2>
			<div class="">
				<template ngFor let-list [ngForOf]="lists" let-index="index">
					<button (click)="activeList=index" [innerHtml]="list.name"></button>
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
  directives: [SpotifyListItemComponent],
  styleUrls: ['style/css/spotify.css', 'style/css/confirm-modal.css']
})

export class SpotifyListsComponent {
	@Input() lists;
	@Output('onUpdate') updateLists = new EventEmitter();
	activeList:Number = 0;

	ngOnInit(){
		
	}
	ngOnChanges(){
		console.log(this.lists);
	}

	editList(track:iSpotifyTrack, addSong:boolean){
		console.log(track);
		this.updateLists.emit({track:track, addSong:addSong})
	}
	
}
