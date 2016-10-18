import {provideRouter, RouterConfig} from '@angular/router';

import {HomeComponent} from './home/jfa.home.component';

import {SignUpComponent} from './signup/jfa.signup.component';

import {SignUpListComponent} from './signup/jfa.signup-list.component';
import {RegisterComponent} from './register/jfa.register.component';
import {UnsubscribeComponent} from './register/jfa.unsubscribe.component';
import {GalleryComponent} from './gallery/jfa.gallery.component';
import {EventsComponent} from './events/jfa.events.component';
import {EmailComponent} from './email/jfa.send-mail.component';
import {CheckInListingsComponent} from './checkin/jfa.checkin-listings.component';
import {DashboardComponent} from './dashboard/jfa.dashboard.component';
import {SpotifyAdminComponent} from './admin/jfa.spotify-admin';


import {AuthGuard} from './services';

interface JfaRoute{
	path:string,
	routerPath:string,
	name:any,
	title:string,
	menuName:string,
	useAsDefault?:boolean,
	canActivate?:any
}
export const publicRoutes = [
	{
		path:'',
		routerPath:'',
		name:HomeComponent,
		title:"Juggling and Flow Arts <small>Let's Flow<small>",
		menuName:"Home",
		useAsDefault:true,
	},
	{ 
		path:'register',
		routerPath:'register',
		name : RegisterComponent,
		title:"Signup",
		menuName:"Login/Register",
	},
	{
		path:'register/verify',
		routerPath:'register/verify/:id',
		name:RegisterComponent,
		title:"Verification",
	},{
		path:'register/unsubscribe',
		routerPath:'register/unsubscribe',
		name:UnsubscribeComponent,
		title:"Unsubscribe",
	},
	{
		path:'events',
		routerPath:'events',
		name : EventsComponent,
		title : "Events",
		menuName : "Events & Meetings",
	},
	{
		path:'gallery',
		routerPath:'gallery',
		name : GalleryComponent,
		title : "Gallery",
		menuName :"Gallery",

	}

]
var excludedPaths = ["register"];
export const memberRoutes = [ 
	...publicRoutes.filter(r =>{return !excludedPaths.includes(r.path)}),
	{
		path:'dashboard',
		routerPath:'dashboard',
		name: DashboardComponent,
		title: 'Your Dashboard',
		menuName: ''
	}

];
export const adminRoutes = [
	...memberRoutes,
	{ 
		path:'list',
		routerPath:'list',
		canActivate:[AuthGuard],
		name : SignUpListComponent,
		title:"Signup List",
		menuName:"Signup List",
	},
	{
		path:'signup',
		routerPath:'signup',
		canActivate:[AuthGuard],
		name: SignUpComponent,
		title:"JFA Signup",
		menuName:"Signup",
	},
	{
		path:'email',
		routerPath:'email',
		canActivate:[AuthGuard],
		name : EmailComponent,
		title : "Email",
		menuName :"Send Email",

	},
	{
		path:'checkinlist',
		routerPath:'checkinlist',
		canActivate:[AuthGuard],
		name : CheckInListingsComponent,
		title: "The Check In Listings",
		menuName: "Check In Lists"
	},{
		path:'spotifyadmin',
		routerPath:'spotifyadmin',
		name : SpotifyAdminComponent,
		title : "Spotify Setup",
		menuName : "Spotify"
	}
		];
export const allRoutes = [...publicRoutes, ...memberRoutes, ...adminRoutes];

export const jfaRoutes: RouterConfig = 
		[...allRoutes.map((r:JfaRoute)=>{
			if(r.canActivate){
				return {path:r.routerPath, component:r.name, canActivate:r.canActivate}
			}
			return {path:r.routerPath, component:r.name}
		}), 
		{path: '**', redirectTo:'/'} 
		];

export const appRouterProviders = [
		provideRouter(jfaRoutes)
		];


