import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {
   
    constructor(private authService: AuthService, private rotuer: Router) {}
    
    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot) : Observable<boolean |  UrlTree> | Promise<boolean |  UrlTree> | boolean |  UrlTree {
            return this.authService.observeUser()
                .pipe(
                    take(1),
                    map((user: User) => user ? true : this.rotuer.createUrlTree(["/auth"]))
                 )
    }
}