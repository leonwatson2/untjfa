import {Component, Pipe} from '@angular/core';
import {CheckInService, SettingsService} from '../services';
import {SearchPipe} from '../pipes';

@Pipe({
	name:"paid"
})
class PaidMemberPipe{
	transform(data){
		return data.filter((m)=>{

			return m.paidMember == true
		});
	}
}
@Component({
	selector: 'member-list',
	template: `
		<div class="main">
			<div class="card">
				<div class="title"><span>Member Base</span> <div class="search"><input type="text" [(ngModel)]="memberSearch"/></div></div>

				
				<div *ngFor="let member of members | find:{value:memberSearch}" class="checkin-name">
		          <display-member-info [checkIn]="member"></display-member-info>
		        </div>
		        <h3 *ngIf="members?.length <= 0" class="text-center">No Paid Members Yet <i class="fa fa-smile-o"></i>!</h3>
			</div>
			
			<div class="card ">
				<div class="title">Member Stats</div>
				<div>Number of Check Ins: {{numberOfCheckIns}}</div>
				<div>Average Number of Check Ins: {{averageNumberOfCheckIns | number:'1.0-1'}}</div>
				<div>
					T-shirts:
					
				</div>
			</div>
		</div>
			`,
	// directives: [DisplayMemberInfoComponent],
	styleUrls:['style/css/member-list.css']

})

export class MemberListComponent {
	memberSearch = "";
	members = [];
	numberOfCheckIns = 0;
	averageNumberOfCheckIns = 0;
	tShirtSizes = {};
	constructor(private checkinService:CheckInService, 
				private settingsService:SettingsService){}

	
	ngOnInit(){
		this.checkinService.getCheckInInfo()
			.then((res)=>{
				this.members = res.map((m)=>{
					m.paidMember = m.paidMember == true
					m.receivedShirt = m.receivedShirt == true
					this.numberOfCheckIns += m.numberOfCheckins;
					return m });
					this.averageNumberOfCheckIns = this.numberOfCheckIns / (this.members.length-1);
					this.getTshirtSizes()
			});
		}
	getTshirtSizes(){
			this.settingsService.getShirtSizes()
				.then((res)=>{
					console.log(res);
					this.members.map((m)=>{
					
					});
				});
			}
	}

