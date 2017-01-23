import {Component} from '@angular/core';
import {CheckInService} from '../services';


@Component({
	selector: 'checkin-list-all',
	template: `
		
			
	      <div *ngIf="members?.length > 0">
	        <h3>{{title}}</h3>
	        <div class="members">
	          <template ngFor let-member [ngForOf]="members">
		          <member-info class="member" *ngIf="member.name" [ngClass]="{'paid-member':member.paidMember}" [member]="member"></member-info>
	          </template>
	        </div>
	      </div>
	      <h3 *ngIf="members?.length <= 0" class="text-center">No Check Ins Yet <i class="fa fa-smile-o"></i>!</h3>

	
			
			`,
  styleUrls:['style/css/checkin-board.css', 'style/css/checkin-list.css']

})

export class CheckInListAllComponent {
	private members;
	private title = "All Check Ins";
	constructor(private checkinService:CheckInService){}

	ngOnInit(){
		this.checkinService.getCheckInInfo()
			.then((res)=>{
				this.members = res;
			});
	}

}
