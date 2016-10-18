import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {SpotifyAcceptComponent, SpotifyLoginComponent, SpotifyPlaylistComponent} from './spotify';

import {SpotifyService} from '../services';
@Component({
	selector: 'jfa-spotify-admin',
	template: `
			<spotify-login class="spotify-login"></spotify-login>
			<spotify-playlist (chosen)="setChosenPlaylist($event)" *ngIf="spotifyService.isLoggedIn && !chosen"></spotify-playlist>
			<spotify-accept *ngIf="chosen" [chosenPlaylist]="chosenPlaylist"></spotify-accept>

			`,
  directives: [SpotifyAcceptComponent, SpotifyLoginComponent, SpotifyPlaylistComponent, ROUTER_DIRECTIVES],
  styleUrls:['style/css/spotify.css']
  
})

export class SpotifyAdminComponent {
	chosenPlaylist;
	chosen = false;
	constructor(private router:Router,
				private spotifyService:SpotifyService){}

	ngOnInit(){
	}
	setChosenPlaylist(p){
		this.chosen = true;
		this.chosenPlaylist = p;
	}
}
