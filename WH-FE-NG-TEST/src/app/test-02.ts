/**
 * Update the following components to meet the requirements : 
 * * Bind `field` of [textfield] component to its text input
 * * Pass value of `field` from [textfield] component to [title] property of component [ng-app]
 */
import { Component, NgModule, Output, EventEmitter } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector : 'textfield',
    template : '<input type="text" [(ngModel)]="field" (input)="onFieldChange()" />'
})
export class TextField {
    @Output() fieldChange = new EventEmitter<string>();
    field = "";

    onFieldChange() {
        this.fieldChange.emit(this.field);
    }
}

@Component({
    selector : 'child-component',
    template : `<h2>Title:<h2><br/><textfield (fieldChange)="onFieldChange($event)"></textfield>`
})
export class ChildComponent {
    @Output() titleChange = new EventEmitter<string>();

    onFieldChange(field: string) {
        this.titleChange.emit(field);
    }
}

@Component({
    selector : 'ng-app',
    template : `<div>
                    <child-component (titleChange)="onTitleChange($event)"></child-component> <br/>
                    Title is {{title}}
                </div>`
})
export class Test02Component {
    title:string = "";

    onTitleChange(title: string) {
        this.title = title;
    }
}

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test02Component
            }
        ])
    ],
    declarations : [Test02Component,ChildComponent,TextField]
})
export class Test02Module {};