import {Component, Output, EventEmitter} from '@angular/core';
import {NgForm} from '@angular/forms';
import {flyInOut, flyFromLeft} from '../jfa.animations';



import {Flower, Interest} from '../classes/Flower';
import {UsersService} from '../services';

@Component({
	selector: 'flower-form',
	templateUrl: 'partials/flower-form.component.html',
	directives: [],
	styleUrls:['style/css/signup.css'],
	animations:[flyInOut, flyFromLeft]
})

export class FlowerFormComponent {
	@Output() flowerChange = new EventEmitter();
	@Output() userAdded = new EventEmitter();

	interests:Interest[]; 
	test:any;
	flower = new Flower('','','',[]);
	lastFlower:string;
	submitted = false;
	
	constructor(private usersService:UsersService){
		this.getInterests();
	}
	updateInterests(e, interest, form){
		this.flowerChange.emit(this.flower);
		const allInterests = this.interests;
		this.test = JSON.stringify({length:interest.length});
		console.log(e);
		if(e.target.checked){
	        if(interest.length == 0){
	        	this.flower.interests = [];
	        	for(let intre of allInterests) {
	        		if(this.flower.interests.indexOf(intre) < 0){
	        			this.flower.interests.push(intre);
	        		}
	        	}
	        }else if(this.flower.interests.indexOf(interest) < 0){
	        		this.flower.interests.push(interest);
	        	}
        }
        else {
        	if(interest.length == 0)
        		this.flower.interests = [];
        	else if(this.flower.interests.indexOf(interest) >= 0){
        		let index = this.flower.interests.indexOf(interest);
        		this.flower.interests.splice(index,1);
        	}
        }
        console.log(this.flower.interests,1);
    }
    onSubmit(form){

		this.lastFlower = this.flower.name;
    	this.usersService.addUser(this.flower).subscribe(
    		res => {
    			res.status == 201 ? this.submitted = true : console.log("Error");
    			this.submitted = true;
    			
    		}, 
    		err => { 
    			;
    		}, 
    		() => { 
    			setTimeout(()=>{this.resetForm()}, 5500);
    		});

    }
    resetForm(){
	    this.flower = new Flower("","","",[]);
	    this.submitted = false;
	    this.flowerChange.emit(this.flower);
	}


	getInterests(){
		this.usersService.getInterests().subscribe((interests) => {
			this.interests = interests;

		});
	}

}//component
