import {Component} from '@angular/core';
import {CheckInService} from '../services';
import {MemberInfoComponent} from './';


@Component({
	selector: 'checkin-list-all',
	template: `
		<div class="card">
			
	      <div *ngIf="checkIns?.length > 0">
	        <h3>{{title}}</h3>
	        <div class="members">
	          <template ngFor let-checkIn [ngForOf]="checkIns">
		          <member-info class="member" *ngIf="checkIn.name" [member]="checkIn"></member-info>
	          </template>
	        </div>
	      </div>
	      <h3 *ngIf="checkIns?.length <= 0" class="text-center">No Check Ins Yet <i class="fa fa-smile-o"></i>!</h3>

		</div>
			
			`,
  directives: [MemberInfoComponent],
  styleUrls:['style/css/checkin-board.css', 'style/css/checkin-list.css']

})

export class CheckInListAllComponent {
	private checkIns;
	private title="All Check Ins";
	constructor(private checkinService:CheckInService){}

	ngOnInit(){
		this.checkinService.getCheckInInfo()
			.subscribe((res)=>{
				console.log(res);
				this.checkIns = res;
			});
	}
}
