/**
 * Add 2 input forms in the following component for first name and last name. Once both forms are filled out by the user, and user has clicked out of the fields, then beside it a username should be automatically generated which should be in the following format: [firstname]_[lastname]_[random integer]
 * First name and last name should be lowercased, and then a random integer between 1 and 9 should be added to the end
 * For example: if the inputs are "John" and "DOE" the generated username could be "john_doe_4" or "john_doe_2"
 */
import { Component, NgModule  } from '@angular/core';
import { RouterModule} from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector : 'ng-app',
    template : `
                <h2>Enter your first and last name</h2>
                <div>
                    <label for="firstName">First Name:</label>
                    <input type="text" id="firstName" [(ngModel)]="firstName" (blur)="generateUsername()" />
                </div>
                <div>
                    <label for="lastName">Last Name:</label>
                    <input type="text" id="lastName" [(ngModel)]="lastName" (blur)="generateUsername()" />
                </div>
                <div *ngIf="username">
                    <label for="username">Username:</label>
                    <span id="username">{{ username }}</span>
                </div>
                `,
    styles : []
})
export class UserNameComponent {
    firstName: string = '';
    lastName: string = '';
    username: string = '';

    generateUsername() {
        if (this.firstName && this.lastName) {
            const randomInt = Math.floor(Math.random() * 9) + 1;
            this.username = `${this.firstName.toLowerCase()}_${this.lastName.toLowerCase()}_${randomInt}`;
        }
    }
}

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : UserNameComponent
            }
        ])
    ],
    declarations : [UserNameComponent]
})
export class UserNameModule {};