import { Injectable }             from '@angular/core';
import { CanActivate, Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot }    from '@angular/router';
import { UserService }            from './';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(this.userService);
    if (this.userService.isAdmin) { return true; }
    //TODO FIX:works but when going to url directly does not navigate back to register
    if(!this.userService.hasCheckedUser) return true;
    // Store the attempted URL for redirecting
    this.userService.redirectUrl = state.url;

    // Navigate to the login page
    this.router.navigate(['/events']);

    
    return false;
  }
}