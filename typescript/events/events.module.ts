import {NgModule} from '@angular/core';

import {DisplayEventComponent} from './jfa.event-display';
import {EditEventComponent} from './jfa.event-edit';
import {EventGroupComponent} from './jfa.event-group.component';
import {EventComponent} from './jfa.event.component';
import {EventsComponent} from './jfa.events.component';
import {ConfirmComponent} from '../misc/jfa.confirm.component';

import {FbSelectEventComponent} from './fb-select-event.component'
import {LoadingComponent} from '../misc/jfa.loading.component';

import {JFAEventTypePipe, JFADatePipe, JFAFirstWordPipe} from '../pipes';

NgModule({
	declarations:[
		DisplayEventComponent,
		EventComponent,
		EventGroupComponent,
		EventsComponent,
		EditEventComponent,
		ConfirmComponent,
		FbSelectEventComponent, 
		LoadingComponent],
		imports:[JFADatePipe, JFAEventTypePipe, JFAFirstWordPipe]
})

export class EventsModule{}