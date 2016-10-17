import {Component, Output, EventEmitter} from '@angular/core';
import {NgForm} from '@angular/forms';



import {MemberSignup} from '../classes/Flower';
import {UsersService, UserService, HeroService, FacebookService} from '../services';
import {LoadingComponent} from '../misc/jfa.loading.component';


class LoginMember{
	
	constructor(
		public email:String,
		public password:String){}
}

@Component({
	selector: 'member-login-form',
	styles:[`
 `],
	template: `
<form *ngIf="!verifying" (ngSubmit)="login();" #signupForm="ngForm">
	<h1>Login</h1>
	<div *ngIf="error" class="error" [innerHtml]="error"></div>
	<div class="indicator"></div>
	<label for="email">Email</label>
	<input 
	id="email" 
	type="email"
	name="email"
	placeholder = "president@untjfa.com"
	[(ngModel)]="member.email"
	#email="ngModel"
	required
	>
	<label for="pass">Password</label>
	<input 
	id="pass" 
	type="password"
	name="pass"
	[(ngModel)]="member.password"
	#pass="ngModel"
	required
	>

	<button [disabled]="submitting" type="submit">
		<jfa-loading [isOn]="submitting"></jfa-loading>
		<span *ngIf="!submitting">Submit</span>
	</button>
	
	<button *ngIf="false" [disabled]="submitting" (click)="facebookLogin()" type="button">
		<jfa-loading [isOn]="submitting"></jfa-loading>
		<span *ngIf="!submitting">Login with Facebook</span>
	</button>

</form>
	`,
	directives: [LoadingComponent],
	styleUrls:['style/css/signup.css']
})

export class MemberLoginFormComponent {

	private test = [];
	private submitted = false;
	private submitting = false;
	private error = null;
	private member:LoginMember;
	constructor(private usersService:UsersService, 
				private userService:UserService,
				private heroService:HeroService, 
				private fbService:FacebookService){
		this.member = new LoginMember('','');
	}
	
	ngOnInit(){}

	facebookLogin(){
		this.submitting = true;
		this.fbService.loginWithFacebook().then((res)=>{
			this.submitting = false;
			this.userService.fbLogin(res).subscribe((res)=>{
				this.userService.user = res.member;
			});
		});
	}
    login(){
    	this.submitting = true;
    	this.userService.redirectUrl = "";
		this.userService.login(this.member).subscribe((res)=>{
			this.submitting = false;
			if(res.status == 201){
				this.userService.user = res.member;
				
				setTimeout(()=>{this.heroService.changeTitle()},50);
				
			}else {
				this.showError(res.errorCode);
			}
		});

    }
    showError(errorNum){
    	switch(errorNum){
    		case 1062:
    			this.setError(this.member.email + " is not in the system.");
    		break;
    		case 1020:
    		case 1021:
    			this.setError("Incorrect Email/Password");
    			break;
    		default:;
    	}
    }
    setError(value){
    	this.error = value;
    }

}//component
