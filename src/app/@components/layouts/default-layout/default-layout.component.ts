import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { AppMenu } from '../../../app-menu';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-default-layout',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit {
  public menu: NbMenuItem[];
  public alive: boolean = true;

  constructor( private pagesMenu: AppMenu ) {
    this.initMenu();
  }

  initMenu() {
    this.pagesMenu.getMenu()
      .pipe(takeWhile(() => this.alive))
      .subscribe(menu => {
        this.menu = menu;
      });
  }

  ngOnInit(): void {
   // this.analytics.trackPageViews();
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}