import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import '../classes/SpotifyInterfaces';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export enum eSpotifySearchTypes{
	Album,
	Artist,
	Playlist,
	Track 

}


let SearchTypeDictionary = {
	0 : "album",
	1 : "artist", 
	2 : "playlist",
	3 : "track"
}
class SpotifyScopes {
	public read = {
		playlist:{
			private:'playlist-read-private',
			privateCollabrative:'playlist-read-collabrative',
		},
		follow:'user-follow-read',
		library:'user-library-read',
		subscriptions:'user-read-private',
		birthdate:'user-read-birthdate',
		email:'user-read-email',
		topTracks:'user-top-read'
	}
	public modify = {
		playlist:{
				private:'playlist-modify-private',
				public:'playlist-modify-public'
		},
		follow:'user-follow-modify',
		library:'user-library-modify'
	}
	
	
}

@Injectable()

export class SpotifyService {
	private SpotifyBaseUrl = 'https://api.spotify.com/'; 
	private version = 'v1/'; 
	private spotifyGet:iSpotifyEndPoints;
	private spotifyPost:iSpotifyEndPoints;
	private apiLocation = 'api';
	private limit = 10;
	private market = "US";
	public userInfo:iSpotifyUser;
	private clientId = "776a99a58dd64f00b99cb40275b93a21";
	private clienSecret = "ffd7d9ca4fef486b859a4ba3c0b268f7";
	private redirectUri = "http://untjfa.com/spotifyadmin";
	private userSpotifyResponse:iSpotifyResponse;
	private scopes:SpotifyScopes;
	constructor(private http:Http){
		this.userInfo = {};
		this.scopes = new SpotifyScopes;

		this.spotifyGet = {
				albums:this.SpotifyBaseUrl + this.version + "albums/",
				users:this.SpotifyBaseUrl + this.version + "users/",
				currentUserProfile:this.SpotifyBaseUrl + this.version + "me/",
				tracks:this.SpotifyBaseUrl + this.version + "tracks/",
				currentUserPlaylist:this.SpotifyBaseUrl + this.version + "me/playlists/"
			}
	}
	
	login(){
		let params = new URLSearchParams();
		params.set('client_id',this.clientId);
		params.set('response_type', 'token');
		params.set('scope', this.scopes.read.playlist.private +" "+this.scopes.modify.playlist.private + " " + this.scopes.modify.playlist.public);
		params.set('redirect_uri', this.redirectUri);
		let options = new RequestOptions({
			search:params
		})

		window.open('https://accounts.spotify.com/authorize?'+params.toString(),'_self');
	}

	

	search(query:string, byType:eSpotifySearchTypes = 0, offset:number = 0){
		let params = new URLSearchParams();
		params.set('type',SearchTypeDictionary[byType]);
		params.set('query', query);
		params.set('offset', offset.toString());
		params.set('market', this.market);
		params.set('limit', this.limit.toString());
		let options = new RequestOptions({
			search:params
		})

		return this.http.get(`https://api.spotify.com/v1/search`, options)
					.map((res)=>{
						return res.json().tracks;
					}).catch((err)=>{
						return Observable.of(err);
					});
					
	}
	searchNext(spotifyResult:iSpotifyPaging, prev:boolean = false){
		
		let url = prev ? spotifyResult.previous : spotifyResult.next
		console.log(spotifyResult);
		return this.http.get(url)
					.map((res)=>{
						return res.json().tracks;
					}).catch((err)=>{
						return Observable.of(err);
					});
	}

	getSpotifySongsInformation(ids){
		return this.http.get(`https://api.spotify.com/v1/tracks?ids=${ids}`)
					.map((res)=>{

						return res.json();
					}).catch(res=>{
						return Observable.of(res);
					})


	}
	getSpotifySuggestion(){
		return this.http.get(`${this.apiLocation}/checkin/suggestions`)
					.map(res =>{
						return res.json();
					})
					.catch(res=>{
						return Observable.of(res);
					});
	}

	getSpotifyUser(){
		var head = this.getSpotifyAuthorization();
		let options = new RequestOptions({
			headers:head
		})
		return this.http.get(`${this.spotifyGet.currentUserProfile}`, options)
					.map((res)=>{

						this.userInfo = res.json();
						console.log(this.userInfo);
						return res.json();
					}).catch((res)=>{
						return Observable.of(res);
					})
	}
	getSpotifyAuthorization(){
		return new Headers({
			Authorization: this.userSpotifyResponse.tokenType + " " + this.userSpotifyResponse.accessToken
		});	
	}
	getUserSpotifyPlaylist(){
		var head = this.getSpotifyAuthorization();
		let options = new RequestOptions({
			headers:head
		})
		return this.http.get(`${this.spotifyGet.currentUserPlaylist}`, options)
					.map((res)=>{
						this.userInfo.playlists = res.json();
						return res.json();
					})
	}
	/**
	* Adds spotify track to user playlist.
	* @return observable
	*/
	addTrackToUsersPlaylist(playlist:iSpotifyPlaylist, track:iSpotifyTrack, userInfo:iSpotifyUser = this.userInfo){
		let head = this.getSpotifyAuthorization();
		let params = new URLSearchParams();
		params.set('uris',track.uri);
		
		let options = new RequestOptions({
			headers:head,
			search:params
		})
		return this.http.post(`${this.spotifyGet.users}${userInfo.id}/playlists/${playlist.id}/tracks`,{}, options)
					.map((res)=>{
						console.log(res);
					}).catch((res)=>{
						console.log(res);
						return Observable.of(res);
					})
	}
	addSongSuggestions(checkIn, tracks){
		checkIn = {
			id : checkIn.id, 
			track:tracks.id
		};
		return this.http.post(`${this.apiLocation}/checkin/spotify`, checkIn)
				.map((res)=>{
					return res.json();
				}).catch((res, observ)=>{
					console.log(res);
					return res
				})
	}
	deleteSpotifySuggestion(id){
		return this.http.delete(`${this.apiLocation}/checkin/spotify/${id}`)
			.map((res)=>{
				console.log(res);
				return res;
			})
	}
	setSpotifyResponse(spotifyInfo:iSpotifyResponse){
		this.userSpotifyResponse = spotifyInfo;
		if(this.userSpotifyResponse.isLoggedIn){
			this.getSpotifyUser().subscribe();
		}
		else {
			console.log("Error: ", this.userSpotifyResponse.error);
		}
	}

	get isLoggedIn(){
		if(this.userSpotifyResponse)
			return this.userSpotifyResponse.isLoggedIn
		else return false;
	}

}