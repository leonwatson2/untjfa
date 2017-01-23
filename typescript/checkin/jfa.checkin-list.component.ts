import {Component, Input, OnChanges, OnDestroy} from '@angular/core';

import {CheckInService} from '../services';

import {DefinedEvent} from '../classes/Event';


import * as moment from 'moment'
@Component({
	selector: 'checkin-list',
	template: `
		<div class="card">
			
      <div *ngIf="checkIns?.length > 0">
        <h3>{{title}}</h3>
        <span class="type">{{event.type | eventname}}</span>
        <div *ngFor="let checkIn of checkIns" class="checkin-name">
          <display-member-info [checkIn]="checkIn"></display-member-info>
        </div>
      </div>
      <h3 *ngIf="checkIns?.length <= 0" class="text-center">No Check Ins Yet <i class="fa fa-smile-o"></i>!</h3>

		</div>
			`,
  styleUrls:['style/css/checkin-board.css', 'style/css/checkin-list.css']
})

export class CheckInListComponent implements OnChanges, OnDestroy{
	@Input() event:DefinedEvent;
 
	checkIns:any[] | {error:string, message:string};
  autoRefresh;
  private title;
  constructor(private checkInService:CheckInService){
    this.checkIns = [];
  }
  ngOnInit(){
    this.checkIns = this.event.checkIns;
    this.autoRefresh = setInterval(()=>{
      this.updateCheckIns()
    }, 6000);
    console.log(this.autoRefresh);

    this.setTitle();
  }
  ngOnDestroy(){
    
    clearInterval(this.autoRefresh);
  }

  ngOnChanges(){
    this.updateCheckIns();
  }
  setTitle(){
    if(this.hasPast()){
      this.title = "Who came? " + this.event.startMoment.format('MMM DD\, YYYY');
    }else {
      this.title = "Who's Here?";
    }
  }
  addCheckin(){
    
  }
  hasPast(){
    return !this.event.isHappening();
  }
  updateCheckIns(){
    this.checkInService.getEventCheckInInfo(this.event,["name", "student_id", "t_shirt_size"])
                      .then(res =>{
                        this.checkIns = res;
                      });

  }

}
