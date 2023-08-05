import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkshiftDetailComponent } from './workshift-detail.component';

const routes: Routes = [];

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: WorkshiftDetailComponent,
            },
        ]),
    ],
    exports: [RouterModule],
})
export class WorkshiftDetailRoutingModule {}
