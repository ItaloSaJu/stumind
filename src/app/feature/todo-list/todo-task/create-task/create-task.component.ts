import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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

export interface FormLogin {
  title_category: FormControl<string | null>;
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
  data?: Task

  constructor() {
    this.id = this.router.snapshot.paramMap.get('id')!
    this.getTask(this.id)
  }

  async ngOnInit() {
    
  }

  form = this._fb.group<FormLogin>({
    title_category: this._fb.control('', [Validators.required]),
    title_todo: this._fb.control('', [Validators.required]),
    description_todo: this._fb.control('', [Validators.required]),
  });



  async getTask(id:string){
    const snap = await this._taskService.getTask(id)

    const task = snap.data() as Task
    this.data = task
    
    
  }

  async submit() {
    if (this.form.invalid) return;

    // try {
    //   const { title_category, title_todo, description_todo } = this.form.value;
    //   const tsk = {
    //     title_category: title_category || '',
    //     todo: [
    //       {
    //         title_todo: title_todo ||'',
    //         description_todo: description_todo || '',
    //       },
    //     ],
    //     inPro: [],
    //     done: [],
    //   };

    //   await this._taskService.create(tsk);
    //   this.route.navigateByUrl('/home/todo');
    //   console.log('tarea creada');
    // } catch (error) {
    //   console.log(error);
    // }

     
  
      try {
        const { title_category, title_todo, description_todo } = this.form.value;
    
        // Primero, obtienes el task actual si ya fue creado (por su ID)
        
        if (this.data) {
          // Si ya existe la task, actualizas el array "todo" agregando un nuevo objeto
          this.data.todo = this.data.todo || [];
          this.data.todo.push({
            title_todo: title_todo || '',
            description_todo: description_todo || '',
          });
    
          // Actualizas el task con el nuevo array "todo"
          await this._taskService.updateTask(this.id, this.data);
          console.log('Tarea actualizada con nuevo todo');
        } else {
          // Si no existe, creas una nueva task
          const newTask = {
            title_category: title_category || '',
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
          console.log('Nueva tarea creada');
        }
    
        this.route.navigateByUrl('/home/todo');
      } catch (error) {
        console.log(error);
      }
    
  }
}
