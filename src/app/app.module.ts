import { BrowserModule } from '@angular/platform-browser';
import { InjectionToken, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConverterComponent } from './converter/converter.component';
import { FooterComponent } from './footer/footer.component';
import {
    ButtonsModule,
    IconsModule,
    InputsModule,
    ModalModule,
    NavbarModule,
    TooltipModule,
    WavesModule,
} from 'angular-bootstrap-md';
import { ToastrModule } from 'ngx-toastr';

export const PlatformWindowToken = new InjectionToken('WINDOW');

@NgModule({
    declarations: [AppComponent, ConverterComponent, FooterComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(
            [
                { path: '', component: ConverterComponent },
                {
                    path: '404',
                    loadChildren: () =>
                        import('./not-found/not-found.module').then((m) => m.NotFoundModule),
                },
                { path: '**', redirectTo: '/404', pathMatch: 'full' },
            ],
            { initialNavigation: 'enabled', relativeLinkResolution: 'legacy' },
        ),
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        InputsModule.forRoot(),
        FormsModule,
        ButtonsModule.forRoot(),
        IconsModule,
        WavesModule.forRoot(),
        ReactiveFormsModule,
        ModalModule.forRoot(),
        NavbarModule,
        TooltipModule.forRoot(),
        ToastrModule.forRoot(),
    ],
    providers: [
        { provide: PlatformWindowToken, useValue: typeof window !== 'undefined' ? window : {} },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
