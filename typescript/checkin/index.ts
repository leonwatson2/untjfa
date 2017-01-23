import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CheckInComponent} from './jfa.checkin.component';
import {SpotifyFormComponent} from '../forms/checkin-spotify.component'
import {BooleanWordComponent} from '../misc/jfa.boolean-word.component';
import {CheckInListComponent} from './jfa.checkin-list.component';
import {MemberInfoComponent} from './jfa.member-info.component';
import {DisplayMemberInfoComponent} from './jfa.display-member-info.component';
import {CheckInListAllComponent} from './jfa.checkin-list-all.component';


import {MemberInfoFormComponent} from '../forms/jfa.forms';

@NgModule({
	declarations:[
	CheckInComponent, 
	CheckInListComponent,
	MemberInfoComponent,
	DisplayMemberInfoComponent,
	CheckInListAllComponent,
	SpotifyFormComponent,
	BooleanWordComponent,
	MemberInfoFormComponent
	],
	imports:[CommonModule, FormsModule],
	exports:[CheckInComponent]
})

export class CheckInModule{}