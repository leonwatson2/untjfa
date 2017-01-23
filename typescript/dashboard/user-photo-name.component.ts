import {Component, Input} from '@angular/core';

@Component({
	selector: 'user-photo-name',
	template: `
			<div class="img">
			Img
				<img [src]="info.imageUrl" [alt]="info.name" />
			</div>
			<div class="name">
				<span [innerHtml]="info.name"></span>
			</div>
			`
})

export class PhotoNameComponent {
	@Input() info;


}

/*
*	Display User Photo & Name
*	
*/
