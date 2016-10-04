import {Component, Input} from '@angular/core';
import {DisplayMemberInfoComponent} from './jfa.display-member-info.component';
import {MemberInfoFormComponent} from '../forms/jfa.forms';
import {CheckInService} from '../services';

@Component({
	selector: 'member-info',
	template: `
			<display-member-info *ngIf="member && !editing" (click)="toggleEditing(true)" [member]="member"></display-member-info>
			<edit-member-info *ngIf="editing" (update)="updateMemberInfo($event)" (cancel)="toggleEditing(false)" [member]="member"></edit-member-info>
			`,
  directives: [DisplayMemberInfoComponent, MemberInfoFormComponent],
})

export class MemberInfoComponent {
	@Input() member;
	private editing:boolean = false;

	ngOnInit(){

	}
	ngOnChanges(){
		console.log(this.member);
	}
	toggleEditing(bool){
		this.editing = bool;
	}

	updateMemberInfo(member){
		console.log(member);
	}
}
