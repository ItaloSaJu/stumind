import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthStateService } from 'src/app/shared/auth-state/auth-state.service';
import { MenuComponent } from "../../shared/menu/menu.component";
import { IonicModule, Platform } from '@ionic/angular';
import { ListDashboardComponent } from "./list-dashboard/list-dashboard.component";
import { map, startWith, Subject } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    MenuComponent,
    IonicModule,
    ListDashboardComponent,
    RouterLink,
    NgIf,
    AsyncPipe
]
})
export class HomeComponent   {


  private _authState = inject(AuthStateService)
  viewSize$ = new Subject<number>();

  private _router = inject(Router)

  constructor(private platform: Platform,){}

  mobileView$ = this.viewSize$.pipe(
    startWith(this.platform.width()),
    map(viewSize => viewSize > 992)
  );

  async salir(){
    console.log("salir");
    
    await this._authState.logout()
    this._router.navigateByUrl('login')
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
