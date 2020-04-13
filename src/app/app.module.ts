import { StationTicketPopupComponent } from './@modules/routes/@components/routes/station-list/station/station-ticket/station-ticket-popup/station-ticket-popup.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injector, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './@components/layouts/default-layout/default-layout.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { InitUserService } from './@theme/services/init-user.service';

import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { HttpService } from './@core/services/http-service.service';
import { ConfigService } from './@core/services/config.service';

import { AuthModule } from './@auth/auth.module';

import {MatCardModule, MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatInputModule } from '@angular/material'

import {
  NbMenuModule,
  NbSidebarModule,
  NbWindowModule,
} from '@nebular/theme';


import { AppMenu } from './app-menu';

export function init_app(injector: Injector) {
  return () =>
    new Promise<any>((resolve: Function) => {
      const initUserService = injector.get(InitUserService);
      initUserService.initCurrentUser().subscribe(() => { },
        () => resolve(), () => resolve()); // a place for logging error
    });
}

export function getBaseHref(platformLocation: PlatformLocation): string {
  return platformLocation.getBaseHrefFromDOM();
}

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,

    ThemeModule.forRoot(),
    AuthModule.forRoot(),
    
    MatCardModule, MatButtonModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatInputModule,

    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbWindowModule.forRoot(),
    CoreModule.forRoot(),
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    HttpService,
    ConfigService,
    AppMenu,
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseHref,
      deps: [PlatformLocation]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [Injector],
      multi: true,
    },
  ],
})
export class AppModule {
  constructor(){
  }

 }