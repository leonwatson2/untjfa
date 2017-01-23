import {Component, Output, EventEmitter} from '@angular/core';
import {SpotifyService} from '../../services/';

@Component({
	selector: 'spotify-playlist',
	template: `
			<h2>Choose the Spotify Playlist <small style="display:block">This is the playlist the suggestions will be added to.</small></h2>
			<div class="playlist-list">
				<div *ngFor="let playlist of playlists" class="playlist">
					<div class="photo">
						<img [src]="playlist.images[0].url" alt="Playlist image" />
					</div>
					<button class="choose" (click)="chosenPlaylist(playlist)">{{playlist?.name}}</button>
				</div>
			</div>
			`,
  styleUrls:['style/css/spotify.css']
})

export class SpotifyPlaylistComponent {
	@Output() chosen = new EventEmitter();
	playlists;
	constructor(private spotifyService:SpotifyService){}

	ngOnInit(){
		this.getUserPlaylists();
	}
	getUserPlaylists(){
		this.spotifyService.getUserSpotifyPlaylists()
			.then((res)=>{
				this.playlists = res.items;
			})
	}
	chosenPlaylist(playlist){
		
		this.chosen.emit(playlist);
	}

}
