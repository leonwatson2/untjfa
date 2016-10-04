import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()

export class UsersService{
	public apiLocation = 'api';
	constructor(private http:Http){}
	signups:any;
	getSignups(){
		return this.http.get(`${this.apiLocation}/signups`).map(res => {
			return res.json().signups;
		});
	}

	getInterests(){
		return this.http.get(`${this.apiLocation}/interests`).map(res => {
			return res.json().interests;
		});
	}

	checkUserCredentials(user){
		return this.http.post(`${this.apiLocation}/members`, user).map(res => {
			return res.json();
		});	
	}

	facebookLogin(user){
		return this.http.post(`${this.apiLocation}/members/facebook`, user)
			.map(res => {
			return res.json();
		}).catch((err)=>{
			return Observable.of(err);
		});	
	}

	addUser(newUser){
		if(newUser.name.length == 0){
			return;
		}
		var headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post(`${this.apiLocation}/signups`, JSON.stringify(newUser))
						.map(res => {
							return res;
						}).catch(res => {
				          // The error callback (second parameter) is called
				          return Observable.throw(res.json());
				          // The success callback (first parameter) is called
				          // return Observable.of(res.json());
				        });;
	}
	userDelete(user){
		return this.http.delete(`${this.apiLocation}/signups/${user.id}`)
					.map( res => {
						return res.json();
					});
	}
	getMembers(){
		return this.http.get(`${this.apiLocation}/members`).map(res => {
			return res.json().members;
		});
	}
	getMemberById(id){
		return this.http.post(`${this.apiLocation}/members/id`, JSON.stringify({id:id}))
		.map(res => {
			return res.json();
		});	
	}
	addMember(member){
		return this.http.post(`${this.apiLocation}/members/add`, JSON.stringify(member))
			.map(res => {
				return res.json();
			}).catch((err, caught)=>{
				return Observable.of(err);
			})
	}
	checkForMember(email){
		return this.http.post(`${this.apiLocation}/members/email`, JSON.stringify(email))
			.map(res => {
				return res.json();
			})
	}
	verifyMember(id){
		return this.http.post(`${this.apiLocation}/members/verify`, JSON.stringify({id}))
				.map( res => {
					return res.json();
				});
	}
	unsubscribeSignUp(email){
		console.log(email);
		return this.http.post(`${this.apiLocation}/members/unsubscribe`, JSON.stringify(email))
				.map( res => {
					return res.json();
				})
	}
	
}