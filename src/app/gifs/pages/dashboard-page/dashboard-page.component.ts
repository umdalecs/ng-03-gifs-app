import { Component } from '@angular/core';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    RouterOutlet,
    SideMenuComponent,
  ],
  templateUrl: './dashboard-page.component.html',
})
export default class DashboardPageComponent {}
