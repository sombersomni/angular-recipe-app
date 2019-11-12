import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { throwError,  BehaviorSubject, timer, Observable, Subscription } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private user = new BehaviorSubject<User>(null);
    private expireTimer$: Subscription;
    constructor(
        private http: HttpClient,
        private router: Router) { }

    signUp(email: string, password: string) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`;
        return this.http.post<AuthResponseData>(url, { email, password, returnSecureToken: true })
            .pipe(
                catchError(this.handleError),
                tap(response => {
                    const { email, localId, idToken, expiresIn } = response;
                    this.handleAuth(email, localId, idToken, +expiresIn)
                }))
    }

    login(email: string, password: string) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`;
        return this.http.post<AuthResponseData>(url, { email, password, returnSecureToken: true })
            .pipe(
                catchError(this.handleError),
                tap(response => {
                    const { email, localId, idToken, expiresIn } = response;
                    this.handleAuth(email, localId, idToken, +expiresIn)
                }))
    }

    logout() {
        this.expireTimer$.unsubscribe();
        this.user.next(null);
        this.router.navigate(["/auth"]);
        localStorage.removeItem("user");
    }

    observeUser() {
        return this.user.asObservable();
    }

    
  autoLogin() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      return;
    }
    const { email, id, Token, TokenExpirationDate } = user;
    const storedUser = new User(email, id, Token, new Date(TokenExpirationDate));
    if (storedUser.token) {
      this.user.next(storedUser);
      const expirationDuration = (new Date(TokenExpirationDate).getTime() - new Date().getTime()) * 1000;
      this.autoLogout(expirationDuration);
    } 
  }

  autoLogout(expirationDuration: number) {
      this.expireTimer$ = timer(expirationDuration * 1000).subscribe(() => {
          this.logout();
      })
  }
    
    private handleAuth( email: string, localId: string, idToken: string, expiresIn: number) {
        const expiration = new Date().getTime() + expiresIn * 1000;
        const expirationDate = new Date(expiration)
        const user = new User(email, localId, idToken, expirationDate);
        //localStorage
        this.user.next(user);
        this.autoLogout(expiresIn);
        localStorage.setItem("user", JSON.stringify(user));
    }

    private handleError(errResponse: HttpErrorResponse) {
        let errorMessage = "An unknown error occured!";
        if (!errResponse.error || !errResponse.error.error) {
            return throwError(errorMessage);
        }

        switch (errResponse.error.error.message) {
            case "EMAIL_EXISTS":
                errorMessage = "The email address is already in use by another account.";
                break;
            case "EMAIL_NOT_FOUND":
                errorMessage = "The user doesn't exist!";
                break;
            case "INVALID_PASSWORD":
                errorMessage = "The password is invalid. Try again!";
            default:
                break;
        }

        return throwError(errorMessage);
    }

}