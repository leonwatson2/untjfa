import {Component, Input} from '@angular/core';
import {SpotifyService} from '../../services';
import {SpotifySongComponent} from './';

@Component({
	selector: 'spotify-accept',
	template: `
			<h2>Add Songs to Spotify Playlist</h2>
			<div class="suggestions">
				<button *ngIf="deletedSuggestions.length > 0" (click)="undoDeny()"><i class="fa fa-undo"></i> Undo Deny</button>
				<template ngFor let-track [ngForOf]="tracks">
					<div class="suggestion">
						<div class="foot">
							<button (click)="addToPlaylist(track)" class="confirm">Accept</button>
							<button (click)="denySpotifySuggestion(track)" class="deny">Deny</button>
						</div>
						<spotify-song [track]="track"></spotify-song>
					</div>
				</template>
			</div>
			<checkin-spotify-form (finished)="spotifyResponse($event)" *ngIf="addNewSong"></checkin-spotify-form>

			`,
  directives: [SpotifySongComponent],
  styleUrls:['style/css/spotify.css', 'style/css/confirm-modal.css']
})

export class SpotifyAcceptComponent {
	@Input('chosenPlaylist') playlist;
	private tracks:iSpotifyTrack[];
	private deletedSuggestions:iSpotifyTrack[] = [];
	private addNewSong:boolean = true;
	constructor(private spotifyServicee:SpotifyService){}

	ngOnInit(){
		this.updateTracks();
		// setInterval(()=>{this.updateTracks()}, 7000);
	}	

	updateTracks(){
		this.spotifyServicee.getSpotifySuggestion()
			.subscribe((res)=>{
				if(res.tracks) {
					var ids = res.tracks.map((t)=>{
						return t.spotifyId
					}).join(',');
					this.spotifyServicee.getSpotifySongsInformation(ids)
						.subscribe((res)=>{
							if(this.tracks !== res.tracks)
								this.tracks = res.tracks;
						})
				}
				
			});
	}
	denySpotifySuggestion(track:iSpotifyTrack){
		this.spotifyServicee.deleteSpotifySuggestion(track.id)
			.subscribe((res)=>{
				if(res.json().numberAffected){
					this.deletedSuggestions.push(track);
					this.updateTracks();
				}
			});
	}
	undoDeny(){
		console.log(this.deletedSuggestions);
		// TODO: Change so CHeckInId is also restored
		if(this.deletedSuggestions.length > 0){
			let track = this.deletedSuggestions.pop();
			this.spotifyServicee.addSongSuggestions({id:4}, track);
			this.updateTracks();
			console.log(track);
		}
	}
	spotifyResponse(e){
		this.spotifyServicee.addSongSuggestions({id:2}, e)
			.subscribe((res)=>{
				console.log(res);
			});
	}
	addToPlaylist(track:iSpotifyTrack){
		console.log("Add " + track.name + " to the playlist "+ this.playlist.name);
		this.spotifyServicee.addTrackToUsersPlaylist(this.playlist, track).subscribe();
		
	}
}
