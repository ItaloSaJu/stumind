import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { LoginComponent } from './auth/feature/login/login.component';
import { AuthStateService } from './shared/auth-state/auth-state.service';
import { MenuComponent } from "./shared/menu/menu.component";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, LoginComponent, MenuComponent],
})
export class AppComponent {

 
}
