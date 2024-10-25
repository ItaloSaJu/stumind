import { Routes } from '@angular/router';
import { LoginComponent } from './auth/feature/login/login.component';
import { RegistratiComponent } from './auth/feature/registrazione/registrati.component';
import { HomeComponent } from './feature/home/home.component';
import { privateGuard, publicGuard } from './core/auth.guard';
import { MenuComponent } from './shared/menu/menu.component';
import { TodoListComponent } from './feature/todo-list/todo-list.component';
import { ListDashboardComponent } from './feature/home/list-dashboard/list-dashboard.component';
import { MeteoComponent } from './feature/meteo/meteo.component';
import { AddTodoComponent } from './feature/todo-list/modal-create-category/add-todo.component';
import { UpdateTodoComponent } from './feature/todo-list/update-todo/update-todo.component';
import { TodoTaskComponent } from './feature/todo-list/todo-task/todo-task.component';
import { CreateTaskComponent } from './feature/todo-list/todo-task/modal-create-task/create-task.component';

export const routes: Routes = [
  {
    canActivate: [publicGuard()],
    path: 'registrati',
    component: RegistratiComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    canActivate: [privateGuard()],
    path: 'home',
    component: MenuComponent,
    children: [
      {
        path: '',
        component: ListDashboardComponent,
      },
      {
        path: 'todo',
        component: TodoListComponent,
        children: [
          {
            path: ':id',
            component: TodoTaskComponent,
          },
        ],
      },
      
      {
        path: 'add-todo',
        component: AddTodoComponent,
      },
      {
        path: 'update-todo',
        component: UpdateTodoComponent,
      },
      {
        path: 'meteo',
        component: MeteoComponent,
      },
    ],
  },
  { path: '**', redirectTo: '/home' },
];
