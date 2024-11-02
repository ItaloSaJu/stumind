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


  category_id: Array<category_id> = [];
  currentTaskId: string = '';
  title_category: any ='TodoList'
  

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.title_category
    if(this.category_id.length > 0){
      console.log(this.category_id);
      
      this.currentTaskId= this.category_id[0].id
      this.route.navigate(['/home/task', this.currentTaskId])
    }
    this.getCategoryId();
  }

  getCategoryId() {
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
      .subscribe((category_id) => {
        // console.log(category_id); // TODO : revisar porque salen muchos estampados
         console.log(category_id); 
        this.category_id = category_id;
        console.log('currentid ', this.currentTaskId);
        
        // const x = category_id.filter(x => x.id !== this.currentTaskId)
        // this.title_category = x[0].title_category
        
      });

  }

  async openModal() {
    
    const modal = await this.modalController.create({
      component: AddTodoComponent,
      componentProps: { 
        categoryId: this.category_id
      }
    });
    return await modal.present();
  }

  idButton(id: string, title_category:string) {
    this.currentTaskId = id;
    // this.title_category = title_category
  }

}
