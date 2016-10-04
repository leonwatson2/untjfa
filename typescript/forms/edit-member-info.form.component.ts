import {Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';

@Component({
	selector: 'edit-member-info',
	template: `
			<form (ngSubmit)="submit()" #memberForm="ngForm">
				<div class="close" (click)="cancelEdit()"><i class="fa fa-remove"></i></div>
				<h3><input type="text" [(ngModel)]="editedMember.name" name="name" /></h3>
				<div class="info">
					<div> T-Shirt Size:
						<input type="text" [(ngModel)]="editedMember.tShirtSize" name="t-shirt-size" /> 
					</div>
					<div> Student ID:
						<input type="number" [(ngModel)]="editedMember.studentId" name="student-id" /> 
					</div>
					<div>
						<span [innerHtml]="'# Events attended: <em>'+editedMember.numberOfCheckins + '</em>'"></span> 
					</div>	
					<button type="submit" (click)="submit()">Save</button>
				</div>
			</form>
			`,
  directives: [],
})

export class MemberInfoFormComponent implements OnChanges {
	@Input() member;
	@Output() cancel = new EventEmitter();
	@Output() update = new EventEmitter();
	private editedMember;
	editableCheckin:Object;
	ngOnInit(){
	}
	ngOnChanges(){
		this.editedMember = this.member;
	}
	
	submit(){
		console.log("submitted", this.editedMember);

	}
	cancelEdit(){
		this.editedMember = this.member;
		this.cancel.emit({});
	}
}
