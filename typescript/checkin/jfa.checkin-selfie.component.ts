import {Component, Input} from '@angular/core';
import {JFAFirstWordPipe} from '../pipes';

@Component({
	selector: 'selfie',
	template: `
			<div class="checkin-selfie">
				<div class="photo">
					<img [src]="checkin.photoUrl" alt="checkin.name" />
				</div>
				<div class="name">{{checkin.name | firstword}}</div>
			</div>		
			`,
  directives: [],
  pipes:[JFAFirstWordPipe],
  styleUrls:['style/css/checkin-board.css']
})


export class SelfieComponent {
	@Input() checkin;


}	
