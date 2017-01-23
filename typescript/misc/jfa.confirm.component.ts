import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
	selector: 'jfa-confirm',
	template: `
			<div *ngIf="visible" class="confirm-modal">
				<div class="head"><h2>Deleting Event</h2></div>
				<div class="message">Are you sure you want to delete this event?</div>
				<div class="foot">
					<button (click) = "sendResponse(true);" class="confirm">Yes</button>
					<button (click) = "sendResponse(false);" class="deny">No</button>
				</div>
			</div>
			`,
  styleUrls:['style/css/confirm-modal.css']
})

export class ConfirmComponent {
	@Input() visible;
	@Output() response = new EventEmitter();

	sendResponse(res){
		this.response.emit(res);
	}
}
	