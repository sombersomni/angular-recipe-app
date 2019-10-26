import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: "app-auth",
    templateUrl: "./auth.component.html",
    styleUrls: ["./auth.component.css"]
})

export class AuthComponent {
    @ViewChild('authForm', {static: true}) authForm: NgForm;
    isLoginMode = false;
    isLoading: boolean = false;
    errorMessage: string;

    constructor(
        private authService: AuthService,
        private router: Router) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit() {
        let authObs: Observable<AuthResponseData>;
        this.isLoading = true;
        if(this.authForm.valid) {
            const {email, password} = this.authForm.value;
            if(this.isLoginMode) {
                authObs = this.authService.login(email, password);
              
            } else {
                authObs = this.authService.signUp(email, password);
            }
            authObs.subscribe((response) => {
                console.log(response);
                this.isLoading = false;
                this.errorMessage = '';
                this.router.navigate(["/recipes"])
            },
            errorMessage => {   
                console.log(errorMessage);
                this.errorMessage = errorMessage;
                this.isLoading = false;
            })
            this.authForm.reset();
        }
        
    }
}