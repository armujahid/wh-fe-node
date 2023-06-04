/**
 * Update the following components to meet the requirements : 
 * 
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 * 
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 * 
 * You can add error messages below each field that shows if the field is not valid
 */
import { Component, NgModule  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector : 'ng-app',
    template : `<form (submit)="onSubmit($event)">
                    <h2>Login</h2>
                    <br/>
                    <input type="email" value="" name="email" [(ngModel)]="email" />
                    <div *ngIf="emailError" style="color:red">{{emailError}}</div>
                    <br/>
                    <input type="password" value="" name="password" [(ngModel)]="password" />
                    <div *ngIf="passwordError" style="color:red">{{passwordError}}</div>
                    <button type="submit">Submit</button>
                    <br/><br/>
                    <div *ngIf="logged_in">Logged In!</div>
                </form>`
})
export class Test03Component {

    email:string = "";
    password:string = "";

    emailError:string = "";
    passwordError:string = "";

    logged_in = false;

    // EmailValidator regex from @angular/forms :D
    // https://github.com/angular/angular/blob/cb31dbc75ca4141d61cec3ba6e60505198208a0a/packages/forms/src/validators.ts#LL125C1-L127C1
    EMAIL_REGEXP =/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    // https://stackoverflow.com/a/19605207/2073920
    PASSWORD_REGEXP = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    onSubmit(event:any) {
        event.preventDefault();
        this.emailError = "";
        this.passwordError = "";
        if (!this.email.match(this.EMAIL_REGEXP)) {
            this.emailError = "Email should be in correct format ( ex: ends with @a.com)";
        }
        if (!this.password.match(this.PASSWORD_REGEXP)) {
            this.passwordError = "Password should contain at least one special character, one upper case character, one lower case character, one number and a minimum of 8 characters in length";
        }
        this.logged_in = this.emailError === "" && this.passwordError === "";
    }
}

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test03Component
            }
        ])
    ],
    declarations : [Test03Component]
})
export class Test03Module {};