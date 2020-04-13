/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NbMenuItem } from '@nebular/theme';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AppMenu {

  getMenu(): Observable<NbMenuItem[]> {
    const dashboardMenu: NbMenuItem[] = [
      
      {
        title: 'Routes',
        icon: 'car-outline',
        link: '/routes',
      },
      {
        title: 'Monitoring',
        icon: 'monitor-outline',
        link: '/monitoring',
      },
      {
        title: 'Inventory',
        icon: 'clipboard-outline',
        link: '/inventory',
      },
      {
        title: 'Dashboard',
        icon: 'home-outline',
        link: '/dashboard',
      },
      {
        title: 'Help',
        icon: 'question-mark-circle-outline',
        children: [{
          title: 'Logout',
          icon: 'log-out-outline',
        },
        {
          title: 'Back previous page',
          icon: 'arrow-ios-back-outline',
        },
        {
          title: 'Start station',
          icon: 'play-circle-outline',

        },
        {
          title: 'Show / hide map',
          icon: 'map-outline',
        },
        {
          title: 'Pause route',
          icon: 'pause-circle-outline',
        },
        {
          title: 'Change station',
          icon: 'refresh-outline',
        },
        {
          title: 'Arrived to station',
          icon: 'flag-outline',
        },
        {
          title: 'Skip to next station',
          icon: 'skip-forward-outline',
        },
        {
          title: 'Open location data',
          icon: 'info-outline',
        },
        {
          title: 'Close station',
          icon: 'close-circle-outline',
        },
        {
          title: 'Go to map',
          icon: 'navigation-2-outline',
        },
        {
          title: 'Help',
          icon: 'layout-outline',
        }
      ],

      },
    ];

    const menu: NbMenuItem[] = [];

    return of([...dashboardMenu, ...menu]);
  }
}
