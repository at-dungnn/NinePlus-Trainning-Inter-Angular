import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export class UnSubscribable implements OnDestroy {

    protected unsubscribeAll: Subject<any>;

    constructor() {
        this.unsubscribeAll = new Subject<any>();
    }

    ngOnDestroy(): void {
        this.unsubscribeAll.next({});
        this.unsubscribeAll.complete();
    }
}
