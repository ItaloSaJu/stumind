import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, query, updateDoc, where } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { AuthStateService } from 'src/app/shared/auth-state/auth-state.service';


export interface todo{
  idTask?:string
  title_todo?:string
  completed?:boolean

}
export interface todoList{
  
  id?: string;
  title_category?:string;
  todo?:todo[];
}
const PATH = 'todo';
@Injectable({
  providedIn: 'root'
})


export class TodoService {

  private todoSubject = new Subject<todoList>();
  private _firestore = inject(Firestore);
  private _authState = inject(AuthStateService)
  private _collection = collection(this._firestore, PATH);
  private _query = query(
    this._collection,
    where('userId', '==', this._authState.currentUser?.uid)
  )

  todoObservable$ = this.todoSubject.asObservable();


  constructor() { }


  create(todo: todoList) {

    return addDoc(this._collection, {...todo, userId: this._authState.currentUser?.uid});
  }

  allCategoryToDoList() {
    return collectionData(this._query, {idField:'id'});
  }

  getTask(id:string){
    const docRef = doc(this._collection, id)
    return getDoc(docRef)
    
  }

  updateTask(todoId: string, updatedTodo: any) {
    const taskDocRef = doc(this._firestore, `${PATH}/${todoId}`);
    return updateDoc(taskDocRef, updatedTodo);
  }

  deleteTodo(taskId: string | undefined) {
    const taskDocRef = doc(this._firestore, `${PATH}/${taskId}`);
    return deleteDoc(taskDocRef);
  }

  sendTodo(todoListObs: todoList) {
    console.log(todoListObs);
    
    this.todoSubject.next(todoListObs);
  }

}
