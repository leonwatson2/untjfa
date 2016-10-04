import {Component, Input, Output, EventEmitter, ElementRef} from '@angular/core';
import {NgClass} from '@angular/common';

import {DomSanitizationService} from '@angular/platform-browser';
import {JfaEvent} from '../classes/Event';

import {DisplayEventComponent} from './jfa.event-display';
import {EditEventComponent} from './jfa.event-edit';
import {ConfirmComponent} from '../misc/jfa.confirm.component';

import {EventsService, MediaService, UserService} from '../services';

//pipes
import {JFAEventTypePipe, JFADatePipe, JFAFirstWordPipe} from '../pipes';



// ******************** TODO
//          Make the edit the back of the card
//          Change edit back to admin only


@Component({
  selector: 'jfa-event',
  template: `
  
  <div [ngClass]="{deleting: isDeleting}" class="main">
    <div class="card event" [ngClass]="{active:activeEvent}" (click)="activeEvent=true">
        <div class="notify" [ngClass]="{show:hasNotification}" >
            <span [innerHtml]="notification"></span>
        </div>
        <jfa-confirm [visible]="confirmDelete" (response)="deleteEvent($event)"></jfa-confirm>
        <button *ngIf="userService.isAdmin" (click)="isEditingEvent = !isEditingEvent" class="edit-button">
          <i [ngClass]="{show:!isEditingEvent}" title="Edit Event" class="fa fa-2x fa-edit"></i> 
          <i [ngClass]="{show:isEditingEvent}" title="Discard Edit" class="fa fa-2x fa-remove"></i> 
        </button>
        <display-event *ngIf="!isEditingEvent" [event]="event"></display-event>
        <edit-event 
          *ngIf="isEditingEvent" 
          [event]="event" 
          (saved)="changeEvent($event)"
          (deleted)="confirmDelete = true"
          ></edit-event>
    </div> 
  </div>
`,
  directives: [DisplayEventComponent, EditEventComponent, ConfirmComponent, NgClass],
  styleUrls:['style/css/events.css']  
})

export class EventComponent {
  @Input() event:JfaEvent;
  @Output() delete = new EventEmitter();
  @Output() saved = new EventEmitter();

  private notification:string;
  private isEditingEvent:boolean;
  private hasNotification:boolean;
  private isDeleting:boolean;
  private confirmDelete:boolean;
  private activeEvent:boolean;
  
  constructor(private eventService:EventsService,
              private userService:UserService, 
              private elementRef:ElementRef){  }

  ngOnInit(){
    this.isEditingEvent = false;
    this.hasNotification = false;
    this.isDeleting = false;
    this.confirmDelete = false;
    this.activeEvent = false;
    this.notification = "Saved";
  }
  changeEvent(event){
    this.event = event;
    this.eventService.updateEvent(event).subscribe((res)=>{
      if(res.status == 201)
        this.resetEvent();
    });
     
  }
  deleteEvent(shouldDelete){
    console.log(shouldDelete);
    if(shouldDelete){
      this.isDeleting = true;
      this.eventService.deleteEvent(this.event)
          .subscribe((res)=>{
            console.log(res);
             if(res.status == 201){
               this.delete.emit({});
             }
          });
    
    }else {
      this.confirmDelete = false;
      console.log("Don't delete it.");
    }
  }
   resetEvent(){
      this.hasNotification = true;
      this.notification = 'Saved! <i class="fa fa-smile-o"></i>';
      this.isEditingEvent = false;
      
      this.saved.emit({});
      window.scrollTo(0, this.elementRef.nativeElement.offsetTop);
      
      setTimeout(()=>{
        this.hasNotification = false;
      }, 2000)
     
   }

}


