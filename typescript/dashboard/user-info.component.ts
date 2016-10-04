/*
*	Display User Info:
*	Is Member:
*	T-shirt Size:
*	
*/

import {Component, Input} from '@angular/core';

@Component({
	selector: 'user-info',
	template: `
			<div class="t-shirt">
				T-shirt size: <span [innerHtml]="info.tShirtSize"></span>
			</div>
			<div class="membership">
				Membership: <span [innerHtml]="info.membership"></span>
			</div>
			`,
  directives: [],
})

export class InfoComponent {
	@Input() info;
	 
}
	