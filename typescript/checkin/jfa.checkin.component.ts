import {Component, Input, OnChanges} from '@angular/core';
import {DomSanitizationService} from '@angular/platform-browser';
import {NgClass, NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';
import {NgForm, NgControl} from '@angular/forms';

import {UserService, CheckInService, SettingsService, EventsService, SpotifyService} from '../services';
import {SpotifyFormComponent} from '../forms/jfa.forms';

import {JfaEvent} from '../classes/Event';

interface UserCheckIn{
	id?:number
	name:string
	email?:string
	event_id:number
	student_id?:number
	numberOfCheckins?:number
	remember?:boolean
	tShirtSize?:any;

}

enum eCheckInStage {
	returner,
	email,
	info,
	tShirt,
	finished,
	checkedIn,
	spotify,
	notCheckedIn

}
@Component({
	selector: 'jfa-checkin',
	template: `
		<div [ngClass]="{do:checkingIn}" [ngSwitch]="checkInStage" class="check-in">
			<form *ngSwitchCase="eCheckInStage.returner" class="check-in-form" (ngSubmit)="submitById()" #checkInReturnerForm="ngForm">
				<div class="close" (click)="closeCheckIn(0); checkInStage='default'"><i class="fa fa-close"></i></div>
				<h3 class="message">Welcome Back! Check in as :</h3>

				<h3 class="message" [innerHtml]="userCheckIn.name"></h3>
				<div class="input-group">
					<button 
						type="button" 
						name="returner" 
						[disabled]="submitting"
						(click) = "submitById();"
						required
						>Yes <i class='fa fa-smile-o fa-2x'></i>
					</button>
					
					<button 
						type="button" 
						name="not-returner" 
						(click) = "checkInStage = eCheckInStage.email; checkInService.removeRemember()"
						required
						>No <i class='fa fa-frown-o fa-2x'></i>
					</button>
				</div>
			</form>

			<form *ngSwitchCase="eCheckInStage.email" class="check-in-form" (ngSubmit)="submitByEmail()" #checkEmailForm="ngForm">
				<div class="close" (click)="closeCheckIn(0); checkInStage='default'"><i class="fa fa-close"></i></div>
				<h3 class="message">We just need a few things! </h3>
				<div class="input-group">

					<label for="email">Email</label>
					<input 
						id="email" 
						type="email" 
						name="email" 
						placeholder="Email*"
						[(ngModel)]="userCheckIn.email"
						required
						/>
				</div>

					<button 
					[disabled]="submitting"
					class = "check-in-submit fade-in"
					>
						<span>Check In <i class="fa fa-smile-o spin-360"></i> </span>
					</button>
			</form>

			<form *ngSwitchCase="eCheckInStage.info" class="check-in-form" (ngSubmit)="submit(checkInForm.value)" #checkInForm="ngForm">
				<div class="close" (click)="closeCheckIn(0)"><i class="fa fa-close"></i></div>

				<h3 class="message" [innerHtml] = "messages.firstCheckIn"></h3>
				
				<div class="input-group">
					<label for="name">First and Last Name*</label>
					<input 
						id="name" 
						type="text" 
						name="name" 
						[placeholder]="randomOfficer"
						[(ngModel)]="userCheckIn.name"
						/>
				</div>

				<div class="input-group">
					<label for="studentid">Student ID</label>
					<input 
						id="studentid" 
						type="text" 
						name="studentid" 
						placeholder="11111111"
						[(ngModel)]="userCheckIn.student_id"
						/>
				</div>
				<div class="input-group">
					<input 
						id="remember" 
						type="checkbox" 
						name="remember" 
						[(ngModel)]="userCheckIn.remember"
						/>
					<label for="remember" class="remember">
						
						<span> 
							<span *ngIf="!userCheckIn.remember">Don't</span> Remember Me For Next Check In 
						</span> 
						<i *ngIf="!userCheckIn.remember" class="fa fa-frown-o"></i> 
						<i *ngIf="userCheckIn.remember" class="fa fa-smile-o "></i> 
					</label>
				</div>	

					
					<button 
					[disabled]="submitting"
					class = "check-in-submit fade-in"
					>
						<span >Check In <i class="fa fa-check spin-360"></i> </span>
					</button>
			</form>

			<form *ngSwitchCase="eCheckInStage.tShirt" class="check-in-form t-shirt-form" (ngSubmit)="submit(tshirtForm.value)" #tshirtForm="ngForm">
					<h3 class="message">What's your shirt size?</h3>
				<div class="t-shirt-sizes">
					<div *ngFor="let shirtSize of shirtSizes; let i = index" class="{{shirtSize.name}}">
						<input 
						
						id="{{shirtSize.name}}-{{i}}"
						type="radio" 
						name="shirt-size"
						[value]="shirtSize.id"
						(click)="updateShirtSize(shirtSize)" 
						>

						<label tabindex="0" 
						[ngClass]="{active: userCheckIn.shirtSize == shirtSize.id}" 
						htmlFor="{{shirtSize.name}}-{{i}}">
						<i
						[attr.style]="shirtSize.fontSize"
						class="fa fa-black-tie"></i>
						</label>    
						<label
						htmlFor="{{shirtSize.name}}-{{i}}">
						{{shirtSize.abbr}}</label>
					</div>
				</div>
				<button 
					[disabled]="submitting"
					class = "check-in-submit fade-in"
					>
					<span>Check In <i class="fa fa-smile-o spin-360"></i> </span>
					</button>
			</form>
			
			<checkin-spotify-form (finished)="spotifyResponse($event)" *ngSwitchCase="eCheckInStage.spotify"></checkin-spotify-form>


			<div *ngSwitchCase="eCheckInStage.finished" class="final-message message fade-in">
				<div class="close" (click)="closeCheckIn(0)"><i class="fa fa-close"></i></div>
				<h3 class="message" [innerHtml]="messages.finished"></h3>
			</div>

			<button 
			*ngSwitchDefault
			type = "button"
			class = "check-in-button"
			(click)="startCheckIn()"
			>
				<span>Check In</span> 
				<i *ngIf="!checkedIn" class="fa fa-check check"></i> 
				<i *ngIf="checkedIn" class="fa fa-heart check"></i> 
			</button>
			<button 
			*ngSwitchCase="eCheckInStage.checkedIn"
			type = "button"
			class = "checked-in-button"
			(click)="spin = !spin"
			>
				<span>Checked In</span>  
				<i [ngClass]="{'spin': spin}" class="fa fa-heart beat-font"></i> 
			</button>
		</div>
			`,
  directives: [NgClass, NgSwitch, NgSwitchCase, NgSwitchDefault, SpotifyFormComponent],
  styleUrls:['style/css/checkin.css']
})

export class CheckInComponent implements OnChanges{
	@Input('events') currentEvents:JfaEvent[];
	private randomOfficer:string;
	private checkInStage:number;
	private checkingIn:boolean;
	private returningCheckIn:boolean;
	private spin = false;
	private currentEventId:number;
	private submitting = false;
	private messages = {
		firstCheckIn : "Cool your first checkin! We just need two more things.",
		finished : "We got you! Now Let's Flow"
	}
	private userCheckIn:UserCheckIn = {name:"", email:"", student_id:null, event_id:30};
	private eCheckInStage = eCheckInStage;
	private numberOfQuestionsAsked = 0;
	private testing = false;
	private shirtSizes;

	constructor(private userService:UserService, 
				private checkInService:CheckInService,
				private settingsService:SettingsService,
				private eventsService:EventsService,
				private sanitizer:DomSanitizationService,
				private spotifyService:SpotifyService){
		
	}

	ngOnInit(){
		this.checkingIn = false;
		
		
		if(this.testing){
			this.checkInStage = eCheckInStage.spotify;
			this.checkingIn = true;
			
		}

		this.setRandomOfficerName();
		this.checkForRecentCheckIn();
		this.settingsService.getShirtSizes()
			.subscribe((res)=>{
				this.shirtSizes = res;
				this.shirtSizes.forEach((s, i)=>{
					let fontSize = (2.5+(i*.41666666));
					s.fontSize = this.sanitizer.bypassSecurityTrustStyle("font-size:"+ fontSize +"em;");
				});
			});
		if(navigator.geolocation)
			console.log(true);
		
	}
	ngOnChanges(){
		this.userCheckIn.event_id = this.currentEventId = Number(this.currentEvents[0].id);
		if(this.checkInService.alreadyCheckedIn(this.currentEventId) && !this.userService.isAdmin){
			this.checkInStage = eCheckInStage.checkedIn;
		}
	}
	startCheckIn(){
		this.checkingIn = true;
		this.returningCheckIn ? this.checkInStage = eCheckInStage.returner : this.checkInStage = eCheckInStage.email;
	}
	submitByEmail(){
		this.submitting = true;
		this.userCheckIn.event_id = this.currentEventId;
		this.checkInService.checkEmail(this.userCheckIn.email)
			.subscribe((checkIn)=>{
				this.submitting = false;
				if(checkIn){
					this.userCheckIn = checkIn;
					if(this.hasAllInformation())
						this.submit();
				} else {
					this.checkInStage = eCheckInStage.info;
				}
			});
	}
	submitById(){
		this.submitting = true;
		this.checkInService.checkInById()
			.subscribe((checkIn)=>{
				this.submitting = false;
				this.userCheckIn = checkIn;
				if(this.hasAllInformation())
					this.submit();
			});

	}
	spotifyResponse(response){
		if(response.addSong){
			this.spotifyService.addSongSuggestions(this.userCheckIn, response.tracks)
				.subscribe((res)=>{
					let endIndex = this.userCheckIn.name.indexOf(' ') || this.userCheckIn.name.length - 1;
					var firstName = this.userCheckIn.name.slice(0, endIndex);
					this.messages.finished = "Cool " + firstName + ", " + "we'll add it soon. Now let's flow.";
					this.closeCheckIn();
					console.log(res);
				});
		}else {
			this.closeCheckIn();
		}

	}
	submit(){
		let remember = this.userCheckIn.remember;
		delete this.userCheckIn.remember;
		this.userCheckIn.event_id = this.currentEventId;
		this.submitting = true;

		this.checkInService.addCheckin(this.userCheckIn)
			.subscribe((checkIn)=>{
				this.submitting = false;
				this.userCheckIn = checkIn;
				if(remember)
					this.checkInService.storeCheckInId(checkIn);
				if(this.hasAllInformation())
					this.closeCheckIn();

			});
	}
	closeCheckIn(delay = 3500){
		this.checkInStage = eCheckInStage.finished;
		setTimeout(()=>{
			if(this.userService.isAdmin){
				this.checkInStage = eCheckInStage.notCheckedIn;
				this.userCheckIn = {name:"", event_id:this.userCheckIn.event_id};
			}else {
				this.checkInStage =  eCheckInStage.checkedIn;
			}
			this.checkingIn = false;
				}, delay);
		this.checkInService.setCheckedIn(this.currentEventId);
	}

	updateShirtSize(shirtSize){
		this.userCheckIn.tShirtSize = shirtSize.id;
	}
	setRandomOfficerName(){
		this.settingsService.getOfficerData()
			.subscribe((res)=>{
				let officerNames = res.officers.officer.map((o)=>{
					return o.name;
				});
				this.randomOfficer = officerNames[Math.floor(Math.random()*officerNames.length)]
			})
	}
	checkForRecentCheckIn(){
		if(this.checkInService.checkForRecentCheckIn()){
			this.checkInService.getCheckInInfo(this.checkInService.checkInId)
				.subscribe((checkIn)=>{
					if(checkIn){
						this.userCheckIn = checkIn;
						this.userCheckIn.event_id = this.currentEventId;

						this.returningCheckIn = true;
					} else 
						this.returningCheckIn = false;
				});
		}else {
			this.returningChIn = false;
		}
	}
	hasAllInformation(){
		if(this.userCheckIn.numberOfCheckins >= 1 ){
			if(!this.userCheckIn.tShirtSize){
				this.checkInStage = eCheckInStage.tShirt;
				return false;
			}
		} 
		if(this.userCheckIn.numberOfCheckins >= 2){
			this.checkInStage = eCheckInStage.spotify;
			return false;
		}
		return true;
	}

}
