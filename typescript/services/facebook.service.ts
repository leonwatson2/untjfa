import {Injectable} from '@angular/core';
import {UserService} from './user.service';

import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

declare var FB:any;

@Injectable()


export class FacebookService{
	private isLoggedIn;
	private apiId;
	private name;
	private email;
	private birthday;
	public fbEvents;
	private fbGraphApi = "graph.facebook.com";
	constructor(private userService:UserService, private http:Http){}
	
	init(d = document, s = 'script', id = 'facebook-jssdk') {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7&appId=303826376656354";
	  fjs.parentNode.insertBefore(js, fjs);
	};
	signup(){
		FB.login((response) => {
			if(response.status === 'connected'){
				this.testAPI()
			} 
		 }, {scope: 'public_profile, email, user_birthday'});
	}
	

  testAPI(){
  	FB.api('/me?fields=name, email, birthday', (response)=>{
  		this.name = response.name;
  		this.email = response.email;
  	})
  }
  getUserEvents(){
  	return new Promise((resolve, reject)=>{

	  	FB.login((response) => {
				console.log(response);
				if(response.status === 'connected'){
					FB.api('/me?fields=events', (res)=>{
				  		resolve(res.events.data);
				  	});
				}
			 }, {scope: 'public_profile, user_events'});
  	});

  }
  loginWithFacebook(){
  	return new Promise((resolve, reject)=>{

	  	FB.login((response) => {
				if(response.status === 'connected'){
					FB.api('/me?fields=name, email', (res)=>{
				  		resolve(res);
				  		
				  	});
				}
			 }, {scope: 'public_profile, email'});
  	});
  }

  getEventPicture(id){
  	return new Promise((resolve, reject)=>{
		FB.api(`/${id}/picture?type=large`, (res)=>{
			resolve(res);
		});
  	});
  }

  get getName() : string {
  	return this.name;
  }
	
}

