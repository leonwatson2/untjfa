import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {HeroComponent} from './jfa.hero.component';
import {FooterComponent} from './footer.component';
import {HomeComponent} from './home/jfa.home.component';
import {SignUpComponent} from './signup/jfa.signup.component';
import {SignUpListComponent} from './signup/jfa.signup-list.component';
import {GalleryComponent} from './gallery/jfa.gallery.component';
import {EventsComponent} from './events/jfa.events.component';
import {RegisterComponent} from './register/jfa.register.component';
import {EmailComponent} from './email/jfa.send-mail.component';
import {CheckInListComponent} from './checkin/jfa.checkin-list.component';
import {CheckInListingsComponent} from './checkin/jfa.checkin-listings.component';
import {DashboardComponent} from './dashboard/jfa.dashboard.component';
import {SpotifyAdminComponent} from './admin/jfa.spotify-admin';


import {UserService} from './services/';


@Component({
	selector: 'jfa-app',
	template: `
	<jfa-hero></jfa-hero>
	<router-outlet></router-outlet>
	<jfa-footer></jfa-footer>
	`,
  directives: [HeroComponent,FooterComponent, ROUTER_DIRECTIVES],
  precompile: [HomeComponent, 
				SignUpComponent,
				SignUpListComponent,
				GalleryComponent,
				EventsComponent,
				RegisterComponent,
                EmailComponent,
                CheckInListComponent,
                CheckInListingsComponent,
                DashboardComponent,
                SpotifyAdminComponent]
  
})

export class JFApp {

}
