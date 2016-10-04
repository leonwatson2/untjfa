import {Component} from '@angular/core';
import {CheckInsComponent} from './user-checkins.component';
import {InfoComponent} from './user-info.component';
import {PhotoNameComponent} from './user-photo-name.component';
import {JFAFirstWordPipe} from '../pipes';

@Component({
	selector: 'jfa-dashboard',
	template: `
			<div class="dashboard">
				<h2><span>{{user.name | firstword}}'s</span> Dashboard</h2>
				<user-photo-name [info]="user"></user-photo-name>
				<user-checkins></user-checkins>
				<user-info [info]="user"></user-info>
			</div>	
			`,
  directives: [CheckInsComponent, InfoComponent, PhotoNameComponent],
  pipes: [JFAFirstWordPipe]
})

export class DashboardComponent {
	private user = {
		name: "Leon Watson",
		imageUrl: "references/pic.jpg",
		tShirtSize: "xs",
		membership: "Officer"
	}
}
	