/**
 * Fix the following issues in the component :
 * * ExpressionChangedAfterItHasBeenCheckedError
 * * Spot the memory leak
 * 
 */
import { Component, NgModule, Injectable, Input, OnInit, OnDestroy, ChangeDetectorRef  } from '@angular/core';
import { RouterModule, Router} from "@angular/router";
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subscription } from 'rxjs';


@Injectable()
export class TestService {
    test:BehaviorSubject<string>;

    constructor() {
        this.test  = new BehaviorSubject("angular test #5");
    }

    SetTest(test:string) {
        this.test.next(test);
    }

    ngOnDestroy() {
        this.test.complete(); // clean up
    }
}

@Component({
    selector : 'ng-app',
    template : `
                <h2>Current test is:</h2>
                {{test | async}}
                <br/>
                <child [skip-current]="true"></child>
                `,
    styles : []
})
export class MainComponent implements OnInit {
    test:BehaviorSubject<string>;
    subscription: Subscription

    constructor(private _srv:TestService) {

    }

    ngOnInit() {
        this.test = this._srv.test; // use AsyncPipe to automatically manage the subscription when a component is destroyed.
    }
}

@Component({
    selector : 'child',
    template : `Sample Child component<br/> <button (click)="Next()">next test</button>`
    
})
export class TextChildComponent {
    
    @Input('skip-current') skip = false;

    constructor(private _srv:TestService, private _router:Router) {

    }

    Next() {
        // this._srv.SetTest("angular test #6");
        this._router.navigate(["test-six"]);
    }

    ngAfterViewInit() { // view shouldn't be updated here.
        // using promise/microtask because cd.detectChanges() was not working
        if(this.skip) {
            Promise.resolve().then(() => this._srv.SetTest("angular test #6"));
        }
    }

}

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : MainComponent
            }
        ])
    ],
    declarations : [MainComponent,TextChildComponent],
    providers : [TestService]
})
export class MainModule {};