import {Component, Output, EventEmitter} from '@angular/core';
import {SpotifyService, eSpotifySearchTypes} from '../services';

import {LoadingComponent} from '../misc/jfa.loading.component';
import {BooleanWordComponent} from '../misc/jfa.boolean-word.component';


@Component({
	selector: 'checkin-spotify-form',
	template: `
	<form  class="check-in-form spotify" (ngSubmit)="search()" >
		<h3 class="message"><i class="fa fa-spotify"></i> <span [innerHtml]="songPrompt"></span></h3>
		<div class="spotify-search">
			<input type="search" 
					name="spotify-search" 
					placeholder="Your favorite song e.g. Fireworks"
					[(ngModel)]="spotifyQuery"/>
			
			<button 
			class = "search fade-in"
			[disabled]="submitting"
			>
			<span><bool-word trueWord="Searching" falseWord="Search" [bool]="submitting">Search</bool-word> Spotify <i class="fa fa-search spin-360"></i> </span>
			</button>
				
			<div 
			*ngIf="searched && queryTracks?.length == 0"
			class="empty">
				No results for: 
				'{{spotifyQuery}}'
			</div>
			
			<div class="spotify-list">
				<template ngFor let-track [ngForOf]="queryTracks">
					<input 
					id="{{track.id}}"
					type="radio" 
					name="track-choice"
					[value]="track.id"
					[checked]="selectedTrack == track"
					(click)="updateChosenTrack(track)" 
					>

					<label tabindex="0" 
					htmlFor="{{track.id}}">
					<span style="overflow:ellipsis">{{track.name}}</span>
					<div class="track-info">{{track.artists[0].name}} &#183; {{track.album.name}}</div>
					</label>
				</template>
			</div>
			<div class="navigation-buttons">
				<button 
				type = "button"
				(click)="moreSongs(true)"
				[disabled]="submitting"
				*ngIf="searched && queryResult.offset != 0"
				class = "submit fade-in"
				>
				<span>Prev Songs ...</span>
				</button>
				<button 
				type = "button"
				(click)="moreSongs()"
				[disabled]="submitting"
				*ngIf="searched"
				class = "submit fade-in"
				>
				<span>More Songs ...</span>
				</button>
			</div>

			<button 
			type = "button"
			(click)="submit(true)"
			[disabled]="submitting"
			*ngIf="trackChosen && selectedTrack != null"
			class = "submit fade-in"
			>
			<span>Add '<span [innerHtml]="getTrackName(selectedTrack)"></span>' <i class="fa fa-plus spin-360"></i> </span>
			</button>
		</div>

		<button 
		type = "button"
		class = "deny fade-in"
		(click)="submit(false)"
		>
		<span>Maybe Next Time. <i class="fa fa-smile-o spin-360"></i> </span>
		</button>
	</form>

	`,
	directives: [LoadingComponent, BooleanWordComponent],
	providers:[],
	styleUrls:['style/css/checkin.css']
})

export class SpotifyFormComponent {
	@Output() finished = new EventEmitter();
	private spotifyQuery:string;
	private queryResult:iSpotifyPaging;
	private queryTracks:iSpotifyTrack[];
	private searched:boolean;
	private selectedTrack:iSpotifyTrack;
	private trackChosen:boolean;
	private submitting:boolean;
	private messages = {
		addSongPrompt:["Got a <em>favorite</em> song? Search it and add it to the JFA playlist.", 
						"What's your <em>jam</em>? Search it and add it to the JFA playlist"]
	}
	private songPrompt:string;
	constructor(private spotifyService:SpotifyService){}

	ngOnInit(){
		this.spotifyQuery = "";
		this.queryTracks = [];
		this.searched = false;
		this.submitting = false;
		this.songPrompt = this.randomSongPrompt();
	}
	updateChosenTrack(track:iSpotifyTrack){
		this.selectedTrack = track;
		this.trackChosen = true;
	}
	getTrackName(track:iSpotifyTrack){
		let tLen = track.name.length; 
		var name = track.name;
		if(tLen < 15)
			return name;
		else {
			let endOfWord = name.indexOf(" ", 15);
			if(endOfWord == -1) endOfWord = tLen - 1;
			return name.substring(0, endOfWord) + "...";
		}
	}
	submit(addSong:boolean){
		this.submitting = true;
		this.finished.emit({addSong:addSong, tracks:this.selectedTrack});
		
	}
	moreSongs(previousSongs = false){

		this.spotifyService.searchNext(this.queryResult, previousSongs)
			.subscribe((res)=>{
				this.setSpotifyQuery(res);
			});
	}
	search(){
		this.submitting = true;
		this.spotifyService.search(this.spotifyQuery, eSpotifySearchTypes.Track)
			.subscribe((res)=>{
				this.setSpotifyQuery(res);
			});
	}
	setSpotifyQuery(res:iSpotifyPaging){
		this.queryResult = res;
		this.submitting = false;
		this.selectedTrack = null;
		this.searched = true;
		this.queryTracks = res.items;
	}
	randomSongPrompt(){
		var len = this.messages.addSongPrompt.length;
		return this.messages.addSongPrompt[Math.floor(Math.random() * len)];
	}
}
