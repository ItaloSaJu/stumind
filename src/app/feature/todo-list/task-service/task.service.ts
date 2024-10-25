import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  Firestore,
  getDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';


export interface todo {
  title_todo: string;
  description_todo: string;
}
export interface inPro {
  title: string;
  description: string;
}
export interface done {
  title: string;
  description: string;
}
export interface Task {
  id?: string;
  title_category?: string;
  todo?: todo[];
  inPro?:inPro[];
  done?: done[];
}

const PATH = 'tasks';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  private taskSubject = new Subject<Task>();
  taskObservable$ = this.taskSubject.asObservable();
  private idSubject = new Subject<string>();
  idObservable$ = this.idSubject.asObservable();


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


  sendTask(task: Task) {
    
    this.taskSubject.next(task);
  }


}
