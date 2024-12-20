import { Routes } from '@angular/router';
import { LoginComponent } from './auth/feature/login/login.component';
import { RegistratiComponent } from './auth/feature/registrazione/registrati.component';
import { HomeComponent } from './feature/home/home.component';
import { privateGuard, publicGuard } from './core/auth.guard';
import { MenuComponent } from './shared/menu/menu.component';
import { ListDashboardComponent } from './feature/home/list-dashboard/list-dashboard.component';
import { MeteoComponent } from './feature/meteo/meteo.component';
import { TodoListComponent } from './feature/task/todo-list.component';
import { TodoTaskComponent } from './feature/task/todo-task/todo-task.component';
import { AddTodoComponent } from './feature/task/modal-create-category/add-todo.component';
import { TodoComponent } from './feature/todo/todo.component';
import { TodolistComponent } from './feature/todo/todolist/todolist.component';

export const routes: Routes = [
  {
    canActivate: [publicGuard()],
    path: 'registrati',
    component: RegistratiComponent,
  },
  {
    canActivate: [publicGuard()],
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
        path: 'task',
        component: TodoListComponent,
        children: [
          {
            path: ':id',
            component: TodoTaskComponent,
          },
        ],
      },
      {
        path: 'todo',
        component: TodoComponent,
        children: [
          {
            path: ':id',
            component: TodolistComponent,
          },
        ],
      },
      
      {
        path: 'meteo',
        component: MeteoComponent,
      },
    ],
  },
  { path: '**', redirectTo: '/home' },
];
