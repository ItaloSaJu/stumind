import { Component, OnInit } from '@angular/core';
import { MenuComponent } from 'src/app/shared/menu/menu.component';
import { ListDashboardComponent } from '../home/list-dashboard/list-dashboard.component';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.scss'],
  standalone: true,
  imports: [
    MenuComponent,
    IonicModule,
    ListDashboardComponent,
    RouterLink
]
})
export class MeteoComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
