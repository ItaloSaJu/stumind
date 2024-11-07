import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Done, InPro, TaskService, Todo } from '../task-service/task.service';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MenuComponent } from 'src/app/shared/menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Task } from '../task-service/task.service';
import { CreateTaskComponent } from './modal-create-task/create-task.component';
import { ModalController } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';

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
    CreateTaskComponent,
    CommonModule,
  ],
})
export class TodoTaskComponent implements OnInit, OnDestroy {
  id: string = '';
  dateObj = Date.now();

  private _taskService = inject(TaskService);
  private _route = inject(ActivatedRoute);
  private taskSubscription?: Subscription;

  constructor(private modalController: ModalController) {
    this.id = this._route.snapshot.paramMap.get('id')!;
    this.getTask(this.id);
  }

  trackById(index: number, item: any): string {
    return item.id || index;
  }
  tasks: any = [];
  todo: Todo[] = [];
  inPro: InPro[] = [];
  done: Done[] = [];

  ngOnInit() {
    const x = Date.now();
    this.dateObj = x;
    this.taskSubscription = this._taskService.taskObservable$.subscribe(
      (task) => {
        this.tasks = task;
        this.todo = task.todo || [];
        this.inPro = task.inPro || [];
        this.done = task.done || [];
      }
    );
    console.log(this.todo);
  }

  async drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const item = event.previousContainer.data[event.previousIndex];

      // Actualizar la propiedad "category" según la lista de destino
      if (event.container.id === 'arrayInPro') {
        item.category = 'inPro';
      } else if (event.container.id === 'arrayDone') {
        item.category = 'done';
      } else if (event.container.id === 'arrayTodo') {
        item.category = 'todo';
      }

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

  ngAfterViewInit() {}

  async getTask(id: string) {
    const snap = await this._taskService.getTask(id);
    const task = snap.data() as Task;

    this.todo = task.todo || [];
    this.inPro = task.inPro || [];
    this.done = task.done || [];
    this._taskService.sendTask(task);
  }

  async openModal(item: any) {
    const modal = await this.modalController.create({
      component: CreateTaskComponent, // Tu componente del modal
      componentProps: {
        dataTodo: this.tasks.todo,
        dataInPro: this.tasks.inPro,
        dataDone: this.tasks.done,
        data: this.tasks,
        id: this.id,
        itemTask: item,
      },
    });
    return await modal.present();
  }

  deleteTask(idTask: any) {
    console.log(idTask);
    
    if (idTask.category) {
      this.tasks[idTask.category] = this.tasks[idTask.category].filter(
        (task: any) => {
          return task.idTask !== idTask.idTask;
        }
      );
    }

    this._taskService.updateTask(this.id, this.tasks);
    this._taskService.sendTask(this.tasks);
  }

  isDueSoon(deadline: string): boolean {
    const today = new Date();
    const deadlineDate = new Date(deadline);

    const differenceInTime = deadlineDate.getTime() - today.getTime();
//TODO : ver que es lo que hace getTime,
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

    return differenceInDays <= 1 && differenceInDays >= 0;
  }
  

  ngOnDestroy(): void {
    if (this.taskSubscription) {
      this.taskSubscription.unsubscribe();
    }
  }
}
