import { CommonModule, NgIf } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';
import { map, startWith, Subject } from 'rxjs';
import { ListDashboardComponent } from "../../feature/home/list-dashboard/list-dashboard.component";
import { HomeComponent } from "../../feature/home/home.component";
import { RouterLink } from '@angular/router';
import { AuthStateService } from '../auth-state/auth-state.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ListDashboardComponent,
    HomeComponent,
    RouterLink
]
})
export class MenuComponent  implements OnInit {

  private _authState = inject(AuthStateService)


  constructor(private platform: Platform,) { }

  viewSize$ = new Subject<number>();

  mobileView$ = this.viewSize$.pipe(
    startWith(this.platform.width()),
    map(viewSize => viewSize <= 992)
  );


  ngOnInit() {
  }

 @HostListener('window:resize', ['$event'])
  onResize() {
    this.viewSize$.next(this.platform.width());
  }

  logout(){
    this._authState.logout()
    window.location.reload()

  }
}
