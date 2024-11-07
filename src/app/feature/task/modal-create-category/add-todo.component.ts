import { NgFor, NgIf } from '@angular/common';
import { Component, inject, NgModule, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, TitleStrategy } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { hasEmailError, isRequired } from 'src/app/utils/validators';
import { TaskService } from '../task-service/task.service';
import { ModalController } from '@ionic/angular/standalone';
import { category_id } from '../todo-list.component';
import { Task } from '../task-service/task.service';


export interface FormLogin {
  title_category: FormControl<string | null>;
}

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, NgIf, RouterLink, NgFor],
})
export class AddTodoComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _taskService = inject(TaskService);
  private modalController = inject(ModalController);
  private route = inject(Router);
  categoryId: category_id[] = [];
  id: string = '';
  title_category: string = '';
  // categoryDBButton?:string
  // idCategory:string = ''

  constructor() {}

  ngOnInit() {
    
  }

  form = this._fb.group<FormLogin>({
    title_category: this._fb.control(null, [Validators.required]),
  });

  async submit() {
    if (this.id) {
      console.log(this.id);
      
      // Si el ID está presente, se actualiza la tarea
      const { title_category } = this.form.value;


      const snap = await this._taskService.getTask(this.id);
      const task = snap.data() as Task;

      const tsk = {
        title_category: title_category || '',
        todo: task.todo,
        inPro: task.inPro,
        done: task.done,
      };
      
      await this._taskService.updateTask(this.id, tsk);

      const snaps = await this._taskService.getTask(this.id);
      const tasks = snaps.data() as Task;
      
      this._taskService.sendTask(tasks)

      this.form.reset();
      this.modalController.dismiss();

    } else {
      // Si no hay ID, se crea una nueva tarea
      this.create();

    }
  }

  async create() {
    if (this.form.invalid) return;

    try {
      const { title_category } = this.form.value;
      const tsk = {
        title_category: title_category || '',
        todo: [],
        inPro: [],
        done: [],
      };

      await this._taskService.create(tsk);
      this.form.reset();
      this.modalController.dismiss();
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string) {
    try {
      const selectedCategory = this.categoryId.find((cat) => cat.id === id);

      if (!selectedCategory) {
        throw new Error('Categoría no encontrada');
      }
      this.id = id;

      this.form.patchValue({
        title_category: selectedCategory.title_category,
      });

      // await this._taskService.updateTask(id, tsk);
    } catch (error) {
      console.log(error);
    }
  }

  delete(id: string) {
    this._taskService.deleteTask(id);
    this.modalController.dismiss();
  }
}
