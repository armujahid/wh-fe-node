/**
 * In the following component, update the code so that when the value of the [loan-amount] is changed:
 * * If it's blank or 0, the values of [monthly_payment] and [late_payment] becomes "N/A",
 * * If it has a value, the value of [monthly_payment] becomes 2% of [loan-ammount] and the value of [late_payment] becomes 5% of [monthly_payment].
 * * Both [monthly_payment] and [late_payment] should print in the template in currency format : $1,234
 */

import { Component, Input,NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector : 'ng-app',
    template : `<div>
                    <h2>Loan Details</h2>
                    <b>Loan Amount:</b> <input name="loanAmount" [(ngModel)]="loan_amount" type="number"/> <br/>
                    <b>Monthly Payment:</b> {{monthly_payment !== 'N/A' ? (monthly_payment | currency) : monthly_payment}} <br/>
                    <b>Late Payment Fee:</b> {{late_payment !== 'N/A' ? (late_payment | currency): late_payment}} <br/>
                </div>`
})
export class Test01Component {

    @Input() loan_amount: number = 1000;

    get monthly_payment() {
        return this.loan_amount ? this.loan_amount * 0.02 : 'N/A';
    }
    get late_payment() {
        return typeof this.monthly_payment === 'number' ? this.monthly_payment * 0.05 : 'N/A';
    } 
}

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test01Component
            }
        ])
    ],
    declarations : [Test01Component]
})
export class Test01Module {}