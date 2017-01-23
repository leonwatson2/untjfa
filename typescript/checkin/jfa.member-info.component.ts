import {Component, Input, ElementRef} from '@angular/core';
import {CheckInService, HeroService} from '../services';

@Component({
	selector: 'member-info',
	template: `
			<display-member-info *ngIf="member && !editing" (click)="toggleEditing(true)" [checkIn]="member"></display-member-info>
			<edit-member-info *ngIf="editing" (update)="updateMemberInfo($event)" (cancel)="toggleEditing(false)" [member]="member"></edit-member-info>
			`,
  styleUrls:['style/css/checkin-list.css']
})

export class MemberInfoComponent {
	@Input() member;
	private editingClassName = "editing";
	private editing:boolean = false;
	constructor(private element:ElementRef, private heroService:HeroService){}

	ngOnInit(){}
	
	toggleEditing(bool){
		this.editing = bool;
		this.toggleClass(this.editingClassName, bool);
	}

	updateMemberInfo(member){}

	toggleClass(className:string, add:boolean){
		var classes:string = this.element.nativeElement.className;
		if(add){
			this.addClass(className);
			console.log(this.element.nativeElement);
			this.heroService.smoothScroll(this.element.nativeElement.offsetTop);
		}else this.removeClass(className);
	}
	addClass(newClass:string){
		this.element.nativeElement.className += " " + newClass;
	}
	removeClass(oldClass:string){
		var el = this.element.nativeElement;
		var classes:string = this.element.nativeElement.className;
		el.className = classes.replace(oldClass, "");
	}
}
