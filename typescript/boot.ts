import {enableProdMode, NgModule} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';

import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';

import {JFApp} from './jfa.app.component';
import {HeroComponent} from './jfa.hero.component';
import {FooterComponent} from './footer.component';
import {HomeComponent} from './home/jfa.home.component';
import {InfoComponent} from './home/jfa.info.component';
import {WhoComponent} from './home/jfa.who.component';
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
import {appRouterProviders} from './jfa.routes';
import {DisplayNumbersComponent} from './misc/jfa.displayNumbers.component';


import {NavigationComponent} from './Navigation/jfa.navigation.component';
import {NavigationLinksComponent} from './Navigation/jfa.navigation-links.component';

import {CheckInModule} from './checkin';
import {TestModule} from './test.component';

/*Services*/
import * as Services from './services/';

import {OrderByPipe, SearchPipe, JFADatePipe, JFAEventTypePipe} from './pipes/'


import 'intl';
import 'intl/locale-data/jsonp/en';

@NgModule({
	declarations:[JFApp, 
				HeroComponent, 
				FooterComponent,
				HomeComponent, 
				InfoComponent,
				WhoComponent,
				SignUpComponent,
				DisplayNumbersComponent,
				SignUpListComponent,
				GalleryComponent,
				EventsComponent,
				// RegisterComponent,
                EmailComponent,
                CheckInListComponent,
                CheckInListingsComponent,
                DashboardComponent,
                SpotifyAdminComponent,
                NavigationComponent,
                NavigationLinksComponent,
				OrderByPipe,
				SearchPipe, 
				JFADatePipe,
				JFAEventTypePipe
                ],
	imports:[
		BrowserModule,
		HttpModule,
		FormsModule,
		CheckInModule,
		TestModule,
		appRouterProviders
		],
		providers:[
			Services.CheckInService,
			Services.EmailService,
			Services.EventsService,
			Services.FacebookService,
			Services.HeroService,
			Services.MediaService,
			Services.SettingsService,
			Services.SpotifyService,
			Services.UsersService,
			Services.UserService
			],
	bootstrap:[JFApp]
})
export class AppModule {

}


//enableProdMode();
platformBrowserDynamic()
	.bootstrapModule(AppModule);
