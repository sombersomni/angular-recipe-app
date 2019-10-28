import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

const routes = [{ path: "", component: AuthComponent }];
@NgModule({
    declarations: [AuthComponent],
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
        FormsModule],
    
})

export class AuthModule { }