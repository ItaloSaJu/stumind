import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TaskService } from '../../task/task-service/task.service';
import { ModalController } from '@ionic/angular/standalone';
import { todo, todoList, TodoService } from '../todo-service/todo.service';

export interface FormAddTodo {
  title_category_todo: FormControl<string | null>;
}

@Component({
  selector: 'app-modal-create-todo-category',
  templateUrl: './modal-create-todo-category.component.html',
  styleUrls: ['./modal-create-todo-category.component.scss'],
  
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, NgIf, RouterLink, NgFor],
})
export class ModalCreateTodoCategoryComponent  implements OnInit {

  private _fb = inject(FormBuilder);
  private modalController = inject(ModalController);
  private route = inject(Router);
  private _TodoService = inject(TodoService)

  // categoryId: any[] = [];
  categoryId?:todoList[] = []
  idTodoCategory?:any
  todoUpdate?:todo

  constructor() { }

  form = this._fb.group<FormAddTodo>({
    title_category_todo: this._fb.control(null, [Validators.required]),
  });

  ngOnInit() {
    console.log(this.categoryId);
  }
  

  async submit(){

    if (this.form.invalid) return;
    
    if(this.idTodoCategory){

      const { title_category_todo } = this.form.value;

      const todo = {
        title_category: title_category_todo || '',
        todo: this.todoUpdate
      } as todoList

      console.log(this.categoryId);
      await this._TodoService.updateTask(this.idTodoCategory, todo);
      this._TodoService.sendTodo(todo)
      this.form.reset();
      
      this.modalController.dismiss();
      
    }else{
      this.create()
    }

    
  }

  async create(){
    try {
      const {title_category_todo} = this.form.value
      console.log({title_category_todo} );

      const todo = {
        title_category: title_category_todo || '',
        todo: [] 
      } as todoList

      await this._TodoService.create(todo);

      this.form.reset();
      this.modalController.dismiss();


    } catch (error) {
      console.log(error);
    }
  }


  update(item:any){
    this.form.patchValue({
      title_category_todo: item.title_category
    })

    this.idTodoCategory = item.id
    console.log(item);
    this.todoUpdate = item.todo
    console.log(this.todoUpdate);
    
    
  }

  delete(id:string|undefined){
    this._TodoService.deleteTodo(id)
    this.modalController.dismiss();
  }


}
