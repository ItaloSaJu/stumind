import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthStateService } from 'src/app/shared/auth-state/auth-state.service';
import { MenuComponent } from "../../shared/menu/menu.component";
import { IonicModule } from '@ionic/angular';
import { ListDashboardComponent } from "./list-dashboard/list-dashboard.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    MenuComponent,
    IonicModule,
    ListDashboardComponent,
    RouterLink
]
})
export class HomeComponent   {


  private _authState = inject(AuthStateService)
  private _router = inject(Router)
  async salir(){
    console.log("salir");
    
    await this._authState.logout()
    this._router.navigateByUrl('login')
  }

}
