import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {SearchPipe} from '../pipes/search.pipe';
import {UsersService} from '../services'

import {DisplayNumbersComponent} from '../misc/jfa.displayNumbers.component';
import {SocialMediaComponent} from '../misc/jfa.socialmedia.component';
import {EmailSignupForm, MemberSignupForm} from '../forms/jfa.forms';
import {Flower, Interest} from '../classes/Flower';

import {JFAFirstWordPipe} from '../pipes/first.pipe';
import {flyFromLeft} from '../jfa.animations';


@Component({
	selector: 'jfa-signup',
	template: `<div class="main">
                  <div *ngIf="isSignUpTime" class="card signup update">
                      <h1>Hey</h1>
                      <div *ngIf="flower">
                        
                        <h2 @flyFromLeft *ngIf="flower.name.length > 2 " class="come"> What's up {{ flower.name | firstword}}!</h2>
                        <p @flyFromLeft *ngIf="flower.email.length > 3"> We'll email about events and meetings goin on!</p>
                        <p @flyFromLeft *ngIf="flower.birthday.length">And maybe even give you so sweets on your birthday.</p>
                      </div>
                      <social-media></social-media>
                  </div>
                  <div class="card signup" *ngIf="isSignUpTime">
                    <flower-form (flowerChange)="updateFlower($event)" (userAdded)="getUsers()"></flower-form>
                  </div>
                  

                    <div *ngIf="!isSignUpTime" class="card signup">
                      <h2>Sorry SignUp Is Closed Follow Us!</h2>
                      <social-media></social-media>
                      
                    </div>
                    <display-numbers title="Number of Signups" numberOfUsers="{{numberOfSignups}}"></display-numbers>
                </div>`,
  directives: [EmailSignupForm, DisplayNumbersComponent, SocialMediaComponent],
  pipes:[JFAFirstWordPipe],
  styleUrls:['style/css/signup.css'], 
  animations: [flyFromLeft]
  
})

export class SignUpComponent {
  public users;
  public flower:Flower;
  public numberOfSignups:number = 0;
  public clicking:boolean;
  public isSignUpTime:boolean;
  constructor(private usersService:UsersService, 
              private route:ActivatedRoute){
    this.isSignUpTime = false;
  };

  ngOnInit(){

    this.clicking = false;
    this.getUsers();

  }
  getUsers(){
    this.usersService.getSignups().subscribe((users) => {
      this.users = users;
      this.numberOfSignups = users.length
    });
  }
  
  updateFlower(flower){
    this.flower = flower;
  }

  toggleClicking(state){
    this.clicking = state;
  }
  
}


