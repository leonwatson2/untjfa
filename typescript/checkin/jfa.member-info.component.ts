import {Component, Input} from '@angular/core';
import {DisplayMemberInfoComponent} from './jfa.display-member-info.component';
import {MemberInfoFormComponent} from '../forms/jfa.forms';
import {CheckInService} from '../services';

@Component({
	selector: 'member-info',
	template: `
			<display-member-info *ngIf="member && !editing" (click)="toggleEditing(true)" [checkIn]="member"></display-member-info>
			<edit-member-info *ngIf="editing" (update)="updateMemberInfo($event)" (cancel)="toggleEditing(false)" [member]="member"></edit-member-info>
			`,
  directives: [DisplayMemberInfoComponent, MemberInfoFormComponent],
  styleUrls:['style/css/member-list.css']
})

export class MemberInfoComponent {
	@Input() member;
	private editing:boolean = false;

	ngOnInit(){
	}
	
	toggleEditing(bool){
		this.editing = bool;
	}

	updateMemberInfo(member){
		console.log(member);
	}
}
