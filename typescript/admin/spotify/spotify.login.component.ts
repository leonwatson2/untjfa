import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {SpotifyService, iSpotifyResponse} from '../../services';


@Component({
	selector: 'spotify-login',
	template: `
			<h2>Spotify Login</h2>		
			<button *ngIf="!spotifyService.isLoggedIn" (click)="login()">Login With Spotify</button>
			<div *ngIf="spotifyService.isLoggedIn" >You're logged In As {{spotifyService.userInfo?.display_name}}	
			</div>

			`,
  directives: [],
})

export class SpotifyLoginComponent {
	constructor(private spotifyService:SpotifyService,
				private route:ActivatedRoute,
				private router:Router){}

	ngOnInit(){
		this.checkForSpotifyResponse();
		
	}

	login(){
		this.spotifyService.login();
	}

	
	checkForSpotifyResponse(){
		let urlFragment:string = this.router.routerState.snapshot.fragment;
		let urlQuery = this.router.routerState.snapshot.queryParams;
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
