import { NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TaskService } from '../../task-service/task.service';
import { Task } from '../../task-service/task.service';
import { ModalController } from '@ionic/angular/standalone';

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
export class CreateTaskComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _taskService = inject(TaskService);
  private route = inject(Router);
  private router = inject(ActivatedRoute);

  id: string = ''
  data ?:Task

  constructor(private modalController: ModalController) {
  }

   ngOnInit() {
    
    
  }

  form = this._fb.group<FormLogin>({
    title_todo: this._fb.control('', [Validators.required]),
    description_todo: this._fb.control('', [Validators.required]),
  });

  
 
  async submit() {
    if (this.form.invalid) return;

    try {
      const {  title_todo, description_todo } = this.form.value;
      
      if (this.data) {
          console.log(this.data.todo);
          
          this.data.todo = this.data.todo || [];
          this.data.todo.push({
            title_todo: title_todo || '',
            description_todo: description_todo || '',
          });
          console.log(this.data);
          
          await this._taskService.updateTask(this.id, this.data);
          this.form.reset()
           this._taskService.sendTask(this.data);
           this.modalController.dismiss()
        } else {
          const newTask = {
            todo: [
              {
                title_todo: title_todo || '',
                description_todo: description_todo || '',
              },
            ],
            inPro: [],
            done: [],
          };
    
          await this._taskService.create(newTask);
          this.form.reset()
          console.log('Nueva tarea creada');
        }
    
      } catch (error) {
        console.log(error);
      }
    
  }
}
