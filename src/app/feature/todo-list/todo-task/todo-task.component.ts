import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../task-service/task.service';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
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
    
  ]
})
export class TodoTaskComponent  implements OnInit {

  id: string = ''
  private _taskService = inject(TaskService)
  private _route = inject(ActivatedRoute)

  constructor() { 
    
    
  }

  

  toDoCateogry:any = []
  tasks : any = []
  todo:any = []
  inPro:any =[]
  done:any =[]

   test1 = {
    title: 'test 1',
    description : ' description test 1'
  }
  
  ngOnInit() {
    
  }


  drop(event: CdkDragDrop<string[]>) {
    console.log(event.previousContainer);
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      
      
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }


  allCategory(){
    this._taskService.allCategoryToDoList().subscribe(x => {
      this.toDoCateogry = x
      
      x = this.toDoCateogry.filter((d:any) =>{
        
        return d.id === this.id
      })
      this.toDoCateogry = x
      this.todo = this.toDoCateogry[0].todo
      
    })  
  }

  ngAfterViewInit(){
    this.allCategory()
  }

  async getTask(id:string){
    const snap = await this._taskService.getTask(id)
    console.log(snap);

    const task = snap.data() as Task
    console.log(task.todo);
    
    if(task){
      console.log("tiene");
      
      
    }


    
    
  }

}
