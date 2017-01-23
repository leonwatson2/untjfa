import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';

import {LoadingComponent} from '../misc/jfa.loading.component';

import {EmailService} from '../services';


declare var tinymce;

interface Email{
	subject?:string,
	message?:string,
	test?:boolean,
	testEmailRecipient?:string
}
@Component({
	selector: 'jfa-email',
	template: `
	<form #emailForm = "ngForm" (ngSubmit)="sendEmail()">
		<h1>Email Sender</h1>

		<input 
			type="text" 
			placeholder="Subject!" 
			name="subject" 
			required
			[(ngModel)]="email.subject"
			[ngModelOptions]="{standalone: true}"
			/>
		  <textarea
			id="editor">
		  	{{initMessage}}
		  </textarea>
		  <button
		  >Send</button>
		  <label for="test">Test First</label>
		  
		  <input id="test" type="checkbox" value="test" 
			[(ngModel)]="email.test"
			[ngModelOptions]="{standalone: true}"
			[disabled]="sendingEmails"
		  />

		  <jfa-loading [isOn]="sendingEmails"></jfa-loading>	
		  
		  <input 
		  	id="testemail" 
		  	type="email"
		  	[required]="email.test"
		  	name="testemail" 
		  	[(ngModel)]="email.testEmailRecipient" 
		  	/>
		  	<input type="password" name="pass" [(ngModel)]="emailPass"/>
	</form>
			`,
})

export class EmailComponent {
	email:Email;
	initMessage:string;
	sendingEmails:boolean;
	tinymce;
	emailPass;
	constructor(private emailService:EmailService){
		this.sendingEmails = false;
		//test code
		this.initMessage = "<h1>Truth</h1>";
		this.email = {
				message:"<h1>Truth</h1>", 
				subject:"Here is the truth.", 
				test:true, 
				testEmailRecipient:"Leon@vlw2.com"};
	}
	ngOnInit(){
		this.tinymce = tinymce;
		
		setTimeout(()=>{this.editorInit()}, 1000);
	}

	editorInit(){
		this.tinymce.init({ selector:'#editor', 
 				height: 300,
 				browser_spellcheck: true, 
 				themes:'modern', 
 				skin:'lightgray', 
 				plugins: "link image imagetools emoticons",
				toolbar: "emoticons link image"});

	}
	sendEmail(form, e){
		this.sendingEmails = true;
		this.email.message = this.tinymce.activeEditor.getContent();
		console.log(this.email);
		if(this.emailPass == "meangreen12")
		this.emailService.sendEmail(this.email)
			.then((res)=>{
				this.sendingEmails = false;
			});
	}
}
