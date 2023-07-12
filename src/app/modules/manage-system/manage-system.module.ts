import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageSystemRoutingModule } from './manage-system-routing.module';
import { ManageSystemComponent } from './manage-system.component';
import { BranchListComponent } from './components/branch/branch-list/branch-list.component';
import { BranchCreateEditComponent } from './components/branch/branch-create-edit/branch-create-edit.component';
import { DepartementListComponent } from './components/departement/departement-list/departement-list.component';
import { LocationListComponent } from './components/location/location-list/location-list.component';
import { SharedModule } from 'src/app/shared';
import { DepartementCreateEditComponent } from './components/departement/departement-create-edit/departement-create-edit.component';
import { CommotityesListComponent } from './components/commotityes/commotityes-list/commotityes-list.component';

@NgModule({
    declarations: [
        ManageSystemComponent,
        BranchListComponent,
        BranchCreateEditComponent,
        DepartementListComponent,
        LocationListComponent,
        DepartementCreateEditComponent,
        CommotityesListComponent,
    ],
    imports: [
        CommonModule,
        ManageSystemRoutingModule,
        SharedModule,
    ],
})
export class ManageSystemModule {}
