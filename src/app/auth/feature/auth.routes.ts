import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegistratiComponent } from "./registrazione/registrati.component";

export const authRoutes: Routes = [
    {
        path: 'registrati',
        component: RegistratiComponent
    }
] ;