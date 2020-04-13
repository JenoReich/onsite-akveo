import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from '../../@auth/auth.module';
import { DefaultLayoutRoutingModule } from './default-layout-routing.module';
import { ThemeModule } from '../../@theme/theme.module';




import { NbMenuModule } from '@nebular/theme';
import { DefaultLayoutComponent } from './@components/default-layout/default-layout.component';
import { HelpComponent } from './@components/default-layout/help/help.component';
import { HeaderComponent } from './@components/default-layout/header/header.component';

@NgModule({
  declarations: [ DefaultLayoutComponent, HelpComponent, HeaderComponent ],
  imports: [
    DefaultLayoutRoutingModule,
    // ThemeModule,
    // NbMenuModule,
    // MiscellaneousModule,
    CommonModule,
    // AuthModule.forRoot(),
    // AuthModule,
  ],
  providers: [
  ]
})
export class DefaultLayoutModule { 
  
  constructor() {
  }
}
