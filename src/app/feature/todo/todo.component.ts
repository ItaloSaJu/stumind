import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from 'src/app/shared/menu/menu.component';
import { AddTodoComponent } from '../task/modal-create-category/add-todo.component';
import { ModalController } from '@ionic/angular/standalone';
import { TaskService } from '../task/task-service/task.service';
import { category_id } from '../task/todo-list.component';
import { catchError, map, of } from 'rxjs';
import { ModalCreateTodoCategoryComponent } from './modal-create-todo-category/modal-create-todo-category.component';
import { TodoService } from './todo-service/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  standalone: true,
  imports: [
    MenuComponent,
    IonicModule,
    CdkDropList,
    CdkDrag,
    NgFor,
    RouterLink,
    ReactiveFormsModule,
    AddTodoComponent,
  ],
})
export class TodoComponent  implements OnInit {

  private _taskService = inject(TaskService);
  private route = inject(Router);
  private _TodoService = inject(TodoService)


  category_id: Array<category_id> = [];
  currentTaskId: string = '';
  title_category: any ='TodoList'
  

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    
    if(this.category_id.length > 0){
      
      this.currentTaskId= this.category_id[0].id
      this.route.navigate(['/home/task', this.currentTaskId])
    }
    // this.getCategoryId();
    this.getCategoryTodoId()
  }

  getCategoryTodoId() {
    this._TodoService
      .allCategoryToDoList()
      .pipe(
        map((categories) => {
          console.log(categories);
          
          return categories.map((category) => ({
            id: category.id,
            title_category: category['title_category'],
            todo : category['todo']
          }));
        }),
        catchError((error) => {
          console.error('Error al cargar categorías:', error);
          return of([]);
        })
      )
      .subscribe((category_id) => {
        console.log(category_id);
        
        this.category_id = category_id;
      });

  }


  async openModalTodo() {
    console.log(this.category_id);
    
    const modal = await this.modalController.create({
      component: ModalCreateTodoCategoryComponent,
      componentProps: { 
        categoryId: this.category_id
      }
    });
    return await modal.present();
  }

  idButton(id: string, title_category:any) {
    this.currentTaskId = id;
    console.log(title_category);
    
    // this.title_category = title_category
  }

}
