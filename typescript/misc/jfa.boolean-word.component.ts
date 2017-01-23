import {Component, Input} from '@angular/core';

@Component({
	selector: 'bool-word',
	template: `
			<span *ngIf="booleanVariable">{{tWord}}</span>
			<span *ngIf="!booleanVariable">{{fWord}}</span>
			`
})

export class BooleanWordComponent {
	@Input('trueWord') tWord:string;
	@Input('falseWord') fWord:string;
	@Input('bool') booleanVariable:boolean;
}
