import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {SpotifyAcceptComponent, SpotifyLoginComponent, SpotifyPlaylistComponent, SpotifyListsComponent} from './spotify';

import {SpotifyService} from '../services';
@Component({
	selector: 'jfa-spotify-admin',
	template: `
			<div>
				<button *ngIf="spotifyService.isLoggedIn && chosen" (click)="chosen=false">Change Playlist</button>
			</div>
			<spotify-login class="spotify-login" *ngIf="!spotifyService.isLoggedIn"></spotify-login>
			
			<spotify-playlist 
				*ngIf="spotifyService.isLoggedIn && !chosen"
				(chosen)="setChosenPlaylist($event)" 
				></spotify-playlist>
			
			<spotify-lists 
				*ngIf="spotifyService.isLoggedIn && chosen" 
				[lists]="lists"
				(onUpdate)="updateLists($event)"
				></spotify-lists>
			`,
  directives: [SpotifyAcceptComponent, SpotifyLoginComponent, SpotifyPlaylistComponent, SpotifyListsComponent, ROUTER_DIRECTIVES],
  styleUrls:['style/css/spotify.css']
  
})

export class SpotifyAdminComponent {
	
	lists;
	chosenPlaylist:iSpotifyPlaylist;
	suggestions:iSpotifyTrack[];
	acceptedSongs:iSpotifyTrack[] = [];
	pendingSongs:iSpotifyTrack[] = [];
	deletedSuggestions:iSpotifyTrack[] = [];

	chosen = false;
	constructor(private router:Router,
				private spotifyService:SpotifyService){}

	ngOnInit(){
	}
	setChosenPlaylist(playlist){
		this.chosen = true;
		this.chosenPlaylist = playlist;
		this.updateTracks()
	}
	updateLists(event){
		let track = event.track;
		if(event.addSong){
			console.log("Add");
			this.spotifyService.addTrackToUsersPlaylist(this.chosenPlaylist, track).subscribe();
		}else{
			console.log("Delete");
			this.spotifyService.deleteSpotifySuggestion(track.id)
			.subscribe((res)=>{
				if(res.json().numberAffected){
					this.deletedSuggestions.push(track);
				}
			});
		}
		this.updateTracks();

	}
	updateTracks(){
		this.spotifyService.getSpotifySuggestion()
			.subscribe((res)=>{
				if(res.tracks) {
					var ids = res.tracks.map((t)=>{
						return t.spotifyId
					}).join(',');
					this.spotifyService.getSpotifySongsInformation(ids)
						.subscribe((res)=>{
							if(this.suggestions !== res.tracks)
								this.suggestions = res.tracks;
							this.filterAcceptedSongs(res.tracks);
						})
				}
				
			});
	}

	filterAcceptedSongs(suggestions){
		var suggestionIds = suggestions.map((suggestion)=>suggestion.id)
		this.spotifyService
			.getPlaylistTracks(this.chosenPlaylist)
			.subscribe((res)=>{
				res.items.forEach((item)=>{
					if(suggestionIds.includes(item.track.id)){
						this.acceptedSongs.push(item.track);
					}
				})
				this.pendingSongs = this.suggestions.filter((song)=>{
					return !this.acceptedSongs.map((song)=>{return song.id}).includes(song.id)
				})
				console.log(suggestions);
				this.lists = [
					{
						"name":"Suggested Songs",
						"data":this.pendingSongs,
						"isPending":true
					},
					{
						"name":"Accepted Songs",
						"data":this.acceptedSongs,
						"isPending":false
					},
					{
						"name":"Full Playlist",
						"data":res.items.map((i)=>{return i.track}),
						"isPending":false
					}
				]
			})
	}
	//TODO:Undo Delete
	undoDeny(){
		console.log(this.deletedSuggestions);
		// TODO: Change so CHeckInId is also restored
		if(this.deletedSuggestions.length > 0){
			let track = this.deletedSuggestions.pop();
			this.spotifyServicee.addSongSuggestions({id:4}, track);
			this.updateTracks();
		}
	}


}
