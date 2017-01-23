import {Component, OnInit} from '@angular/core';

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
  styleUrls:['style/css/spotify.css']
  
})

export class SpotifyAdminComponent {
	
	lists;
	chosenPlaylist:iSpotifyPlaylist;
	suggestions:iSpotifySuggestion[];
	acceptedSongs:iSpotifySuggestion[] = [];
	pendingSongs:iSpotifySuggestion[] = [];
	deletedSuggestions:iSpotifySuggestion[] = [];

	chosen:boolean = false;// set to true if a playlist has been chosen
	constructor(private spotifyService:SpotifyService){}

	ngOnInit(){
		if(this.spotifyService.getCurrentPlaylist()){
			this.chosen = true;
			this.updateTracks();
		}
	}
	setChosenPlaylist(playlist:iSpotifyPlaylist){
		this.chosen = true;
		this.spotifyService.setCurrentPlaylist(playlist);
		this.chosenPlaylist = playlist;
		this.updateTracks()
	}
	updateLists(event:{suggestions:iSpotifySuggestion[], addSong:boolean}){
		let tracks = event.suggestions;
		if(event.addSong){
			this.spotifyService.addTracksToUsersPlaylist(tracks).then();
		}else{
			
			this.spotifyService.deleteSpotifySuggestion(tracks)
			.then((res)=>{
				if(res.json().numberAffected){
					this.deletedSuggestions.push(tracks);
				}
			});
		}
		this.updateTracks();

	}
	updateTracks(){
		this.spotifyService.getSpotifySuggestion()
			.then((suggestions:iSpotifySuggestion[])=>{
				
				var ids = suggestions.map((suggestion)=>{
					
					return suggestion.spotifyId;
				
				}).join(',');

				this.spotifyService.getSpotifySongsInformation(ids)
					.then((res)=>{
						let suggestionsWithTrackInfo:iSpotifySuggestion[] = suggestions.map((suggestion, i)=>{
							suggestion.track = res.tracks[i];
							return suggestion
						})
						if(this.suggestions !== suggestionsWithTrackInfo)
							this.suggestions = suggestionsWithTrackInfo;
						this.filterAcceptedSongs(suggestionsWithTrackInfo);
					})
				
			});
	}


	filterAcceptedSongs(suggestions:iSpotifySuggestion[]){
		var suggestionIds = suggestions.map((suggestion,i)=>{
			return suggestion.spotifyId
		})
		var completePlaylist:iSpotifySuggestion[] = []
		this.acceptedSongs = []
		this.pendingSongs = []
		this.spotifyService
			.getPlaylistTracks()
			.then((res)=>{

				var playlistIds = res.items.map((item)=>item.track.id)
				suggestionIds.forEach((suggestion, i)=>{
					if(playlistIds.includes(suggestion))
						this.acceptedSongs.push(suggestions[i])
					else
						this.pendingSongs.push(suggestions[i])
				})

				completePlaylist = res.items.map((i)=>{return {track:i.track}});

				this.lists = [
					{
						"name":"Pending Suggestions",
						"data":this.pendingSongs,
						"isPending":true
					},
					{
						"name":"Accepted Suggestions",
						"data":this.acceptedSongs,
						"isPending":false
					},
					{
						"name":"Full Playlist",
						"data":completePlaylist,
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
			this.spotifyService.addSongSuggestions({id:4}, track);
			this.updateTracks();
		}
	}


}
