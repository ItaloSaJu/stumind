import { CommonModule, NgIf } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';
import { map, startWith, Subject } from 'rxjs';
import { ListDashboardComponent } from "../../feature/home/list-dashboard/list-dashboard.component";
import { HomeComponent } from "../../feature/home/home.component";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ListDashboardComponent,
    HomeComponent
]
})
export class MenuComponent  implements OnInit {

 

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

}
