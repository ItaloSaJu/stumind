import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../task-service/task.service';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MenuComponent } from 'src/app/shared/menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { NgFor } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Task } from '../task-service/task.service';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.scss'],
  standalone: true,
  imports: [
    MenuComponent,
    IonicModule,
    CdkDropList,
    CdkDrag,
    NgFor,
    RouterLink,
  ],
})
export class TodoTaskComponent implements OnInit {
  id: string = '';
  private _taskService = inject(TaskService);
  private _route = inject(ActivatedRoute);

  constructor() {
    this.id = this._route.snapshot.paramMap.get('id')!;
    this.getTask(this.id);
  }
  trackById(index: number, item: any): string {
    return item.id || index;  
  }
  toDoCateogry: any = [];
  tasks: any = [];
  todo: any = [];
  inPro: any = [];
  done: any = [];

  ngOnInit() {}

  async drop(event: CdkDragDrop<string[]>) {
    console.log(event.container);

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const updatedTask = {
        todo: this.todo,
        inPro: this.inPro,
        done: this.done, 
      };
      
      await this._taskService.updateTask(this.id, updatedTask);
    }
  }

 
  ngAfterViewInit() {
  }

  async getTask(id: string) {
    const snap = await this._taskService.getTask(id);

    const task = snap.data() as Task;
    
    this.todo = task.todo;
    this.inPro = task.inPro;
    this.done = task.done;
    console.log(task);
    
  }
}
