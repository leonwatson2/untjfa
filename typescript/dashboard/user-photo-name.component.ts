import {Component, Input} from '@angular/core';

@Component({
	selector: 'user-photo-name',
	template: `
			<div class="img">
				<img [src]="info.imageUrl" [alt]="info.name" />
			</div>
			<div class="name">
				<span [innerHtml]="info.name"></span>
			</div>
			`,
  directives: [],
})

export class PhotoNameComponent {
	@Input() info;

}

/*
*	Display User Photo & Name
*	
*/
