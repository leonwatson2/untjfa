import {provide, enableProdMode} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';

import {disableDeprecatedForms,provideForms} from '@angular/forms';
import {HTTP_PROVIDERS} from '@angular/http';


import {JFApp} from './jfa.app.component';
import {HeroComponent} from './jfa.hero.component';

/*Services*/
import * as Services from './services/';

import {appRouterProviders} from './jfa.routes';

import 'intl';
import 'intl/locale-data/jsonp/en';

enableProdMode();
bootstrap(JFApp, 
	[
	appRouterProviders,
	HTTP_PROVIDERS,
	HeroComponent,
	Services.HeroService,
	Services.UsersService,
	Services.UserService,
	Services.FacebookService,
	Services.EventsService,
	Services.SettingsService,
	Services.CheckInService,
	Services.EmailService,
	Services.MediaService,
	Services.AuthGuard,
	Services.SpotifyService,
	disableDeprecatedForms(),
	provideForms()
	]);
