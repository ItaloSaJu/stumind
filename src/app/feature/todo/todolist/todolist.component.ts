import { CdkDropList } from '@angular/cdk/drag-drop';
import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from 'src/app/shared/menu/menu.component';
import { todo, todoList, TodoService } from '../todo-service/todo.service';
import { TaskService } from '../../task/task-service/task.service';

export interface FormTodo {
  title_todo: FormControl<string | null>;
}

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
  standalone: true,
  imports: [
    MenuComponent,
    IonicModule,
    CdkDropList,
    NgFor,
    NgIf,
    RouterLink,
    ReactiveFormsModule,
  ],
})
export class TodolistComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _router = inject(ActivatedRoute);
  private _todoService = inject(TodoService);
  private _taskService = inject(TaskService);

  idTodo: string = '';
  todoList!: todoList;
  todo?: todo[] = [];

  constructor() {
    const idTodos = this._router.snapshot.paramMap.get('id') || '';
    this.idTodo = idTodos;
  }

  form = this._fb.group<FormTodo>({
    title_todo: this._fb.control(''),
  });

  async ngOnInit() {
    this.getTodoById();
  }

  async getTodoById() {
    if (this.idTodo) {
      // Solo llama a getTask si idTodo no es null ni undefined
      const snap = await this._todoService.getTask(this.idTodo);
      const todo = snap.data() as todoList;
      this.todoList = todo;
      this.todo = this.todoList.todo;

      this._todoService.todoObservable$.subscribe((x) => {
        console.log(x);
        this.todoList = x;
        this.todo = this.todoList.todo;
      });
    } else {
      console.error('ID no válida');
    }
  }

  async onCheckboxChange(event: any, idTask: string) {
    console.log(event.detail.checked);

    const task = this.todo?.find((x) => x.idTask === idTask);
    if (task) {
      task.completed = !event.detail.checked;
    }
    await this._todoService.updateTask(this.idTodo, this.todoList);
  }

  async submit() {
    if (this.form.invalid) return;
    try {
      const { title_todo } = this.form.value;

      const itemTask = this._taskService.createTaskId();
      if (this.todoList) {
        this.todoList.todo = this.todoList.todo || [];
      }
      this.todoList?.todo?.push({
        idTask: itemTask,
        title_todo: title_todo || '',
        completed: true,
      });

      await this._todoService.updateTask(this.idTodo, this.todoList);
      this.todo = this.todoList?.todo;
      console.log(this.todoList?.todo);

      // this._taskService.sendTask(this.data);
      this.form.reset();
    } catch (error) {}
  }

  delete(idTask: any) {
    if (idTask) {
      this.todoList.todo = this.todoList?.todo?.filter((x) => {
        return x.idTask !== idTask;
      });

      this._todoService.updateTask(this.idTodo, this.todoList);
      this.getTodoById();
    }
  }

  get TodosCount(): number {
    return this.todo?.filter((item) => item.completed).length || 0;
  }
  get completedTodosCount(): number {
    return this.todo?.filter((item) => !item.completed).length || 0;
  }
  get disableButton(): boolean {
    const { title_todo } = this.form.value;
    return title_todo && title_todo?.length > 1 ? false : true

    
  }
}
