import { NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ProfileLayoutModule } from './demo/components/profile-layout/profile-layout.module';
import { TableModule } from 'primeng/table';

@NgModule({
    imports: [
        AppLayoutModule,
        ProfileLayoutModule,
        AppRoutingModule,
        CoreModule,
        SharedModule,
        TableModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        HttpClientModule,
    ],
    declarations: [AppComponent],
    providers: [
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
