import { Component, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from 'src/app/shared/menu/menu.component';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';
import { TaskService } from './task-service/task.service';
import { RouterLink } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { AddTodoComponent } from "./modal-create-category/add-todo.component";
import { ModalController } from '@ionic/angular/standalone';

export interface category_id {
  id: string;
  title_category: string;
}
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],

  standalone: true,
  imports: [
    MenuComponent,
    IonicModule,
    CdkDropList,
    CdkDrag,
    NgFor,
    RouterLink,
    ReactiveFormsModule,
    AddTodoComponent
],
})
export class TodoListComponent implements OnInit {
  private _taskService = inject(TaskService);

  category_id: Array<category_id> = [];


  constructor(private modalController: ModalController) {
  }

  ngOnInit() {
    this.getCategoryId()
  }

  getCategoryId(){
    this._taskService
    .allCategoryToDoList()
    .pipe(
      map((categories) => {
        return categories.map((category) => ({
          id: category.id,
          title_category: category['title_category'],
        }));
      }),
      catchError((error) => {
        console.error('Error al cargar categorías:', error);
        return of([]); 
      })
    )
    .subscribe(category_id => this.category_id = category_id);
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: AddTodoComponent, // Tu componente del modal
      
    });
    return await modal.present();
  }

}

