import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(private http: HttpClient) {}

    signUp(body: {email: string, password: string}) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=`;
        this.http.post<any>(url, {...body, returnSecureToke: true })
    }
    
    login(body: {email: string, password: string}) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[API_KEY]`;
        //this.auth.post<any>(url, {...body, returnSecureToke: true })
    }

}