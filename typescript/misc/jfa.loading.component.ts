import {Component, ElementRef, Input} from '@angular/core';

@Component({
	selector: 'jfa-loading',
	template:`
		<img *ngIf="isOn" src="images/loading.gif" alt="Loading" />
	`,
	styles:[`
		img{
			height:50px;
			max-height:100%;
		}
	`]
})

export class LoadingComponent {
	private el:HTMLElement;
	@Input() isOn:boolean;
	constructor(element:ElementRef){
		this.el = element.nativeElement;
	}
	
}
