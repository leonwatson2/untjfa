import {Component, Input} from '@angular/core';
import {CheckInService} from '../services';

@Component({
	selector: 'display-member-info',
	template: `
			<h3>{{member?.name}} {{member.id}}</h3>
			<div class="info">
				<div class="info-group">
					<div *ngIf="member?.tShirtSize"> T-Shirt Size:
						<span [innerHtml]="member?.tShirtSize"></span> 
					</div>
					<div *ngIf="member?.studentId"> Student ID:
						<span [innerHtml]="member?.studentId"></span> 
					</div>
					<div *ngIf="member?.numberOfCheckins">
						<span [innerHtml]="'# Events attended: <em>'+member?.numberOfCheckins + '</em>'"></span> 
							
					</div>	
				</div>
				<div class="info-group">
					<div class="t-shirt" (click)="updateShirtStatus()">
						<div>
							<bool-word [bool]="member.receivedShirt" trueWord="Recieved Shirt" falseWord="No Shirt"></bool-word>
						</div>
						<i class="fa fa-3x fa-black-tie" [ngClass]="{'active':member.receivedShirt}"></i>
					</div>
				</div>
			</div>
			`,
  inputs:[],
  styleUrls:["style/css/checkin-list.css"]
})

export class DisplayMemberInfoComponent {
	@Input('checkIn') member;
	
	constructor(private checkInService:CheckInService){}

	updateShirtStatus(){
		this.member.receivedShirt = !this.member.receivedShirt
		this.checkInService.updateShirtStatus(this.member).then((res)=>{
			console.log(res);
		})
	}

}
