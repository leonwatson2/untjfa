import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';

import {HeroService} from './hero.service'
import {UsersService} from './users.service';

import {adminRoutes, publicRoutes, memberRoutes} from '../jfa.routes';

import * as moment from 'moment';

declare let sjcl:any;


interface User{
	facebookId?:string
	spotifyId?:string	
	id?:number,
	name?:string,
	email?:string,
	isAdmin?:boolean,
	adminType?:number
	signUpDate?:string
	
}
const MembershipEnum = {
	MEMBER:0,
	PRESIDENT:1,
	VICEPRESIDENT:2,
	PROPSMANAGER:3,
	HISTORIAN:4,
	MASTER:5
}

@Injectable()

export class UserService {
	private _user:User;
	
	public isMember:boolean;
	public isLoggedIn:boolean;
	public userRoutes;
	private cryptKey = '10836051';
	private idKey = 'id';
	private userKey = 'user';
	private lastLoginKey = "lastLogin";
	public redirectUrl:string;
	public hasCheckedUser:boolean;
	constructor(private usersService:UsersService,
				private router:Router,
				private heroService:HeroService) {
		this.redirectUrl = "";
		this._user = {};
		this.isLoggedIn = false;
		this.hasCheckedUser = false;
		this.changeNav();
		this._user;

		let id = localStorage.getItem(this.idKey);
		let lastLogin = localStorage.getItem(this.lastLoginKey);
		if(lastLogin) {
				
			if(moment().subtract(3, "hours").isBefore(moment(lastLogin, 'YYYY-MM-DD HH:mm'))){

				this.usersService.getMemberById(this.decrypt(id))
				.subscribe((res)=>{
					this.hasCheckedUser = true;
					this.redirectUrl = this.router.url;
					this.user = JSON.parse(this.decrypt(localStorage.getItem(this.userKey)));
				});
			}else{
				this.hasCheckedUser = true;
				this.logout();
			}

		}else {
			// this.logout();
		}
	}
	private decrypt(val){
		return sjcl.decrypt(this.cryptKey, val);
	}
	public login(user) {		
			return this.usersService.checkUserCredentials(user)
	};
	public fbLogin(user){
		return this.usersService.facebookLogin(user);
	}

	public logout() {
		// Remove token from localStorage
		localStorage.removeItem(this.userKey);
		localStorage.removeItem(this.idKey);
		localStorage.removeItem(this.lastLoginKey);
		this.isLoggedIn = false;
		this.isAdmin = false;
		this.isMember = false;
		this.router.navigate(['/']);

		this.heroService.changeTitle();
		this.changeNav();
	};

	changeNav(){
		if(this.isLoggedIn){
			if(this.isAdmin)
				this.userRoutes = adminRoutes;
			else 
				this.userRoutes = memberRoutes;
		} else {
			this.userRoutes = publicRoutes;
		}
	}
	
	set user(val){
		
		this._user = val;
		this.isAdmin = this._user.isAdmin;
		this.isLoggedIn = true;
		let idValue = sjcl.encrypt(this.cryptKey, this._user.id);
		let userInfo = sjcl.encrypt(this.cryptKey, JSON.stringify(this._user));
		localStorage.setItem(this.idKey, idValue);
		localStorage.setItem(this.userKey, userInfo);
		localStorage.setItem(this.lastLoginKey, moment().format('YYYY-MM-DD HH:mm'));
		this.changeNav();
		
		let nextUrl = this.redirectUrl != "" ? this.redirectUrl : '/';
		if(nextUrl != this.redirectUrl)
			this.router.navigate([nextUrl]); 
		this.heroService.smoothScroll(0);
		setTimeout(()=>{
		this.heroService.changeTitle();
			
		}, 50);

	}
	get name(){
		return this._user.name;
	}

	get isAdmin(){
		return this._user.isAdmin || false;
	}
	set isAdmin(v){
		this._user.isAdmin = Boolean(v);
	}
}
