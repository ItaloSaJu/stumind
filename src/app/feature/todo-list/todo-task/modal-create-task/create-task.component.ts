import { NgIf } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import {
  Done,
  InPro,
  TaskService,
  Todo,
} from '../../task-service/task.service';
import { Task } from '../../task-service/task.service';
import { ModalController } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { category_id } from '../../todo-list.component';

export interface FormLogin {
  title_todo: FormControl<string | null>;
  description_todo: FormControl<string | null>;
}

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],

  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, NgIf, RouterLink],
})
export class CreateTaskComponent implements OnInit, OnDestroy {
  private _fb = inject(FormBuilder);
  private _taskService = inject(TaskService);
  private route = inject(Router);
  private modalController = inject(ModalController);
  private taskSubscription?: Subscription;

  id: string = '';
  data!: Task;
  itemTask: any;
  dataTodo: Todo[] = [];
  dataInPro: InPro[] = [];
  dataDone: Done[] = [];

  ngOnInit() {
    this.form.patchValue({
      title_todo: this.itemTask.title_todo,
      description_todo: this.itemTask?.description_todo,
    });
  }

  form = this._fb.group<FormLogin>({
    title_todo: this._fb.control('', [Validators.required]),
    description_todo: this._fb.control('', [Validators.required]),
  });

  async submit() {
    if (this.form.invalid) return;

    try {
      const { title_todo, description_todo } = this.form.value;

      if (this.itemTask) {

        this.itemTask.title_todo = title_todo;
        this.itemTask.description_todo = description_todo;

      } else if (this.data) {

        const itemTask = this._taskService.createTaskId();
        this.data.todo = this.data.todo || [];
        this.data.todo.push({
          category: 'todo',
          idTask: itemTask,
          title_todo: title_todo || '',
          description_todo: description_todo || '',
        });

      }
      await this._taskService.updateTask(this.id, this.data);
      // this._taskService.sendTask(this.data);
      this.form.reset();
      this.modalController.dismiss();
      
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy(): void {
    if (this.taskSubscription) {
      console.log('adios');
      this.taskSubscription.unsubscribe();
    }
  }
}
