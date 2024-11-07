import { Component, OnInit } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from 'src/app/shared/menu/menu.component';

@Component({
  selector: 'app-list-dashboard',
  templateUrl: './list-dashboard.component.html',
  styleUrls: ['./list-dashboard.component.scss'],
  standalone: true,
  imports: [
    MenuComponent,
    IonicModule,
    RouterLinkWithHref
  ]
})
export class ListDashboardComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
