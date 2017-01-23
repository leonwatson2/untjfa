import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {SpotifyService, SettingsService} from '../../services';

@Component({
	selector: 'spotify-login',
	template: `
			<h2>Spotify Login</h2>		
			<button class="spotify-login-btn" *ngIf="!spotifyService.isLoggedIn" (click)="login()">Login With Spotify</button>
			<h3 (mouseover)="showPass = true" (mouseout)="showPass = false"> 
				<div *ngIf="!showPass">Mouseover to see credentials </div>
				<div *ngIf="showPass"> Usename: <span [innerHtml]="username"></span>, Pass: <span [innerHtml]="password"></span></div>
			</h3>
			<div *ngIf="spotifyService.isLoggedIn" (mouseover)="showPass = true">You're logged In As {{spotifyService.userInfo?.display_name}}	
			
			</div>

			`,
  styleUrls:['style/css/spotify.css']

})

export class SpotifyLoginComponent {
	showPass = false;
	username;
	password;
	constructor(private spotifyService:SpotifyService,
			private settingsService:SettingsService,
				private route:ActivatedRoute,
				private router:Router){}

	ngOnInit(){
		this.checkForSpotifyResponse();
		this.settingsService.getSettings().then(res=>{
			this.username = res.spotify_credentials.username
			this.password = res.spotify_credentials.password
		})
	}

	login(){
		this.spotifyService.login();
	}

	
	checkForSpotifyResponse(){
		var urlFragment = this.route
					      .fragment
					      .map(fragment => fragment || 'None');z
		let urlQuery = this.router.routerState.root.queryParams;
		if(urlFragment){
			let fragmentParts = urlFragment.split('&');
			var spotifyInfo:iSpotifyResponse = {isLoggedIn : false};
			fragmentParts.forEach((f)=>{
				var fragName = f.split('=')[0];
				var fragValue = f.split('=')[1];
				switch(fragName){
					case 'access_token':
					spotifyInfo.accessToken = fragValue;
					spotifyInfo.isLoggedIn = true;
					break;
					case 'expires_in':
					spotifyInfo.expiresIn = fragValue;
					break;
					case 'token_type':
					spotifyInfo.tokenType = fragValue;
					break;
					default:
					;
				}

			});
			this.spotifyService.setSpotifyResponse(spotifyInfo);
		}
		if(urlQuery['error']){
			this.spotifyService.setSpotifyResponse({error:urlQuery['error'], isLoggedIn:false});
		}
	}
}
