import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarProfileComponent } from './topbar-profile.component';
import { TranslationModule } from 'src/app/modules/manage-system/components/i18n';
import { StyleClassModule } from 'primeng/styleclass';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
    declarations: [TopbarProfileComponent],
    imports: [CommonModule, TranslationModule, StyleClassModule, DropdownModule],
    exports: [TopbarProfileComponent],
})
export class TopbarProfileModule {}
