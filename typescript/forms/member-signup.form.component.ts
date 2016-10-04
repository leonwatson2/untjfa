import {Component, Output, EventEmitter} from '@angular/core';
import {NgForm} from '@angular/forms';



import {MemberSignup} from '../classes/Flower';
import {UsersService} from '../services';

import {LoadingComponent} from '../misc/jfa.loading.component';

@Component({
	selector: 'member-signup-form',
	styles:[`
 `],
	template: `
<form (ngSubmit)="onSubmit(signupForm);" #signupForm="ngForm">
	<div *ngIf="error" class="error" [innerHtml]="error"></div>
	<h1>JFA Member Signup</h1>
	<div *ngIf="submitted"> <h2>Thanks for signing up {{lastMember}}</h2>
	<i class="fa fa-smile-o fa-5x"></i>
	<div>
		<small style="opacity:.6;">P.S. we sent you an email to verify your account.</small>
	</div>
	</div>
	<div *ngIf="!submitted">
		<label for="name">Name</label>
		<input 
		id="name" 
		type="text"
		name="name"
		placeholder = "Leon Watson or Leon"
		[(ngModel)] = "member.name"
		required
		>
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
		<div class="indicator"></div>
		<label for="password">Password</label>
		<input 
		id="password" 
		type="password"
		name="password"
		[(ngModel)]="member.password"
		#pass="ngModel"
		required
		>

		<button [disabled]="submitting" type="submit">
			<jfa-loading [isOn]="submitting"></jfa-loading>
			<span *ngIf="!submitting">Submit</span>
		</button>
	</div>
</form>`,
	directives: [LoadingComponent],
	styleUrls:['style/css/signup.css']
})

export class MemberSignupFormComponent {

	test:any;
	member = new MemberSignup('','','');
	lastMember:string;
	submitted = false;
	submitting = false;
	error = null;
	constructor(private usersService:UsersService){
		
	}
	
    onSubmit(form){
    	this.submitting = true;
		this.lastMember = this.member.name;
    	this.usersService.addMember(this.member).subscribe(
    		res => {
    			this.submitting = false;
    			if(res.dberror) this.showError(res.dberror);
    			res.status == 201 ? this.submitted = true : console.log("Error");
    		});

    }
    showError(errorNum){
    	switch(errorNum){
    		case 1062:
    		this.error = this.member.email + " is not available.";
    		break;
    		default:;
    	}
    }

}//component
