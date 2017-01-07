import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {JfaEvent} from '../classes/Event';
@Injectable()

export class CheckInService{
	private apiLocation = "api";
	private checkInIdKey = "checkInId";
	private checkedInToken = "checkedIn";
	public checkInId;
	constructor(private http:Http){}
	/*
	*	Checks if email is already in system.
	*	@returns the information of the email or null
	*/
	checkEmail(email){
		return this.http.post(`${this.apiLocation}/checkin/email`, {email})
						.map((res)=>{
							return res.json().checkIn;
						}).catch(err =>{
							let error = {
								"error" : true,
								"message": err
							}
							return Observable.of(error)
						});
	}
	/*
	*	Adds checkin to system is already in system.
	*	@returns the information of the checkin
	*/
	addCheckin(checkIn){
		delete checkIn.numberOfCheckins;
		return this.http.post(`${this.apiLocation}/checkin/add`, {checkIn})
						.map((res)=>{
							return res.json().checkIn;
						}).catch(err=>{
							let error = this.createErrorObject(err)
							return Observable.of(error);
						});			
	}
	/*
	*	Gets info of checkin from id
	*	@returns the information of the email or null
	*/
	getCheckInInfo(checkInId = ""){
		return this.http.get(`${this.apiLocation}/checkin/${checkInId}`)
						.map((res)=>{
							return res.json().checkIn ? res.json().checkIn : res.json().checkIns;
						}).catch(err=>{
							let error = this.createErrorObject(err)
							return Observable.of(error);
						});
	}
	getEventCheckInInfo(event:JfaEvent, fields:string[]){
		let fieldList = "?fields=" + fields.join(',');
		return this.http.get(`${this.apiLocation}/checkin/event/${event.id}${fieldList}`)
						.map((res)=>{

							return res.json().checkins;
						}).catch((err)=>{
							let error = this.createErrorObject(err)
							return Observable.of(error);
						});
	}
	storeCheckInId(checkIn){
		if(checkIn.id)
			localStorage.setItem(this.checkInIdKey, checkIn.id);
		else
			console.warn("CheckInService: No check in id supplied.");
	}
	checkInById(){
		let id = localStorage.getItem(this.checkInIdKey);
		return this.getCheckInInfo(id);
	}

	checkForRecentCheckIn(){
		if(localStorage.getItem(this.checkInIdKey)){
			this.checkInId = localStorage.getItem(this.checkInIdKey);
			return true;
		}
		return false;
	}
	
	alreadyCheckedIn(eventId){
		let checkInId = localStorage.getItem(this.checkedInToken);
		return checkInId == eventId;
	}
	setCheckedIn(eventId){
		localStorage.setItem(this.checkedInToken, eventId);
	}
	removeRemember(){
		localStorage.removeItem(this.checkInIdKey);
	}

	updateShirtStatus(memberC){
		
		return this.http.put(`${this.apiLocation}/checkin/shirtstatus`, {member:memberC})
						.map((res)=>{
							return res.json().checkIn;
						}).catch(err=>{
							let error = this.createErrorObject(err)
							return Observable.of(error);
						});
	}

	createErrorObject(err:String){
		return {
			error:true,
			message:err
		}
	}

}