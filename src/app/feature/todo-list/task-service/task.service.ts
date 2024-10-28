import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';


export interface Todo {
  category?: string
  idTask: string,
  title_todo: string;
  description_todo: string;
}
export interface InPro {
  category?: string
  idTask: string,
  title_todo: string;
  description_todo: string;
}
export interface Done {
  category?: string
  idTask: string,
  title_todo: string;
  description_todo: string;
}
export interface Task {
  id?: string;
  title_category?: string;
  todo?: Todo[];
  inPro?:InPro[];
  done?: Done[];
}

const PATH = 'tasks';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  private taskSubject = new Subject<Task>();
  taskObservable$ = this.taskSubject.asObservable();


  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);


  create(task: Task) {

    return addDoc(this._collection, task);
  }

  allCategoryToDoList() {
    return collectionData(this._collection, {idField:'id'});
  }

  getTask(id:string){
    const docRef = doc(this._collection, id)
    return getDoc(docRef)
    
  }

  updateTask(taskId: string, updatedTask: any) {
    const taskDocRef = doc(this._firestore, `${PATH}/${taskId}`);
    return updateDoc(taskDocRef, updatedTask);
  }

  
  deleteTask(taskId: string) {
    const taskDocRef = doc(this._firestore, `${PATH}/${taskId}`);
    return deleteDoc(taskDocRef);
  }


  sendTask(task: Task) {
    this.taskSubject.next(task);
  }

  createTaskId(): string {
    return Date.now().toString();
  }


}
