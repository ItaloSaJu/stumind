import { Component, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from 'src/app/shared/menu/menu.component';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { JsonPipe, NgFor } from '@angular/common';
import { TaskService } from './task-service/task.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],

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
export class TodoListComponent implements OnInit {
  private _taskService = inject(TaskService);

  constructor() {}

  toDoCateogry: any = [];
  tasks: any = [];
  todo: any = [];
  inPro: any = [];
  done: any = [];

  // todos = [
  //   {
  //     category:"casa",
  //     todo: [
  //       {
  //         title:"hola casa",
  //         description:"como estas yo estoy muy bien y tu"
  //       },
  //       {
  //         title:"hola casa",
  //         description:"como estas yo estoy muy bien y tu"
  //       }
  //     ],
  //     inPro:[
  //       {
  //         title:"hola in pro casa",
  //         description:"como estas yo estoy muy bien y tu"
  //       },
  //       {
  //         title:"hola in pro in casa",
  //         description:"como estas yo estoy muy bien y tu"
  //       }
  //     ]
  //   },
  //   {
  //     category:"universidad",
  //     todo:[
  //       {
  //         title:"hola universidad",
  //         description:"como estas yo estoy muy bien y tu"
  //       },
  //       {
  //         title:"hola universidad",
  //         description:"como estas yo estoy muy bien y tu"
  //       }
  //     ],
  //     inPro:[
  //       {
  //         title:"hola in pro",
  //         description:"como estas yo estoy muy bien y tu"
  //       },
  //       {
  //         title:"hola in pro",
  //         description:"como estas yo estoy muy bien y tu"
  //       }
  //     ]
  //   }
  // ]

  ngOnInit() {
  }

  // todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  // done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
    console.log(event.previousContainer);

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
    }
  }

 

  // bottone(title: string) {
  //   // console.log(this.toDoCateogry);
  //   // const x = this.toDoCateogry.find((x:any) => x.title_category === title)
  //   // console.log(x);
  //   // this.tasks = x
  //   // this.todo = this.tasks.todo
  //   // this.inPro = this.tasks.inPro
  //   // this.done = this.tasks.done
  //   // console.log(this.todo);
  //   // console.log(this.inPro);
  //   // console.log(this.done);
  // }

  allCategory() {
    this._taskService.allCategoryToDoList().subscribe((x) => {
      this.toDoCateogry = x;
    });
  }

  ngAfterViewInit() {
    this.allCategory();
  }
}
