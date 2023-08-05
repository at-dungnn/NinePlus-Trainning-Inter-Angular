import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkShiftListComponent } from './work-shift-list.component';
const routes: Routes = [];

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: WorkShiftListComponent,
            },
        ]),
    ],
    exports: [RouterModule],
})
export class WorkShiftListRoutingModule {}
