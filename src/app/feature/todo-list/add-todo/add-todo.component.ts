import { NgIf } from '@angular/common';
import { Component, inject, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { hasEmailError, isRequired } from 'src/app/utils/validators';
import { TaskService } from '../task-service/task.service';


export interface FormLogin {
  title_category: FormControl<string | null>;
}

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, NgIf, RouterLink],
})
export class AddTodoComponent implements OnInit {

  private _fb = inject(FormBuilder);
  private _taskService = inject(TaskService)
  private route = inject(Router)


  constructor() {}

 

  
  
  ngOnInit() {
   
  }

  form = this._fb.group<FormLogin>({
    title_category: this._fb.control('', [Validators.required]),
  });


  async submit(){
   if (this.form.invalid) return;

   try {
    const {title_category} = this.form.value
    const tsk = {
      title_category: title_category || '',
      todo : []
      ,
      inPro : []
      ,
      done : []
      
    }
    
    await this._taskService.create(tsk)
    this.route.navigateByUrl('/home/todo')
    console.log("tarea creada");
    
   } catch (error) {
    console.log(error);
    
   }
   
  }
}
