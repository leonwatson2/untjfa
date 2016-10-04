import {Component} from '@angular/core';
import {UsersService} from '../services/';

@Component({
	selector: 'jfa-register',
	template: `

	<section class="main">
	<form class="card" *ngIf="!message" (ngSubmit)="unsubscribe()" #unsubscribeForm="ngForm">
		<label for="email">Enter your email to unsubscibe.</label>
		<input [(ngModel)]="email" type="email" name="email" placeholder="Enter your email."/>
		<button type="submit">Unsubscribe</button>
	</form>
	<div class="card">
		<h2 [innerHtml]="message"></h2>
	</div>
	</section>
	`,
	styleUrls:['style/css/signup.css'], 

})

export class UnsubscribeComponent{
	private email;
	private message;
	constructor(private usersService:UsersService){}

	unsubscribe(){
		this.usersService.unsubscribeSignUp(this.email).subscribe((res)=>{
			console.log(res);
			if(res.wasDeleted){
				this.setMessage("You've been taken off our email list <i class=\"fa fa-smile-o\"></i> ");
			} else{
				this.setMessage("Looks like you're not on our list!");
			}
		});
	}
	setMessage(m){
		this.message = m;
	}
}	