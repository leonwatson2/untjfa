import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Flower, Interest} from '../classes/Flower';
import {UserService, UsersService} from '../services/';
import {MemberSignupForm} from '../forms/jfa.forms';
import {MemberLoginFormComponent} from '../forms/member-login.form.component';
@Component({
	selector: 'jfa-register',
	template: `

	<section class="main">
	<div *ngIf="!verifying" class="card signup">
          <member-signup-form></member-signup-form>
     </div>

	<div *ngIf="verifying" class="card">
		<h2 [innerHTML]="message"></h2>
	</div>


	<div *ngIf="!verifying" class="card signup">
		<member-login-form></member-login-form>
	</div>
	</section>
	`,
	directives: [MemberSignupForm, MemberLoginFormComponent],
	styleUrls:['style/css/signup.css'], 

})

export class RegisterComponent {
	private verifying:boolean;
	private message = "";
	constructor(private userService:UserService,
		private usersService:UsersService,
		private route:ActivatedRoute){
		this.verifying = false;
	}
	ngOnInit(){
		this.route.params.subscribe(p => {
			if(p["id"]){
				this.setVerify();
				
				this.usersService.verifyMember(p["id"]).subscribe((res)=>{
					if(res.status == 201){
						this.setMessage("You're all set " + res.member.name + " :D.");
					} else{
						this.setMessage("Something went wrong when verifying you.");
					}
				});
			}
		});
	}
	setMessage(m){
		this.message = m;

	}
	setVerify(){
		this.verifying = true;
	}


}
