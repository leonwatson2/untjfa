import {Component, Input} from '@angular/core';
import {BooleanWordComponent} from '../misc/jfa.boolean-word.component';
@Component({
	selector: 'display-member-info',
	template: `
			<h3>{{member?.name}}</h3>
			<div class="info">
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
			`,
  directives: [BooleanWordComponent],
  inputs:[],
  styleUrls:["style/css/checkin-list.css"]
})

export class DisplayMemberInfoComponent {
	@Input('checkIn') member;
	


}
