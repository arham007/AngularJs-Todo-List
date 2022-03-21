import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITodo } from './interfaces/todo.interface';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoServiceService {
  private todoCollection: AngularFirestoreCollection<ITodo>;
  // Todos: Observable<ITodo[]>;

  constructor(private afs: AngularFirestore) {
    let a: string | null = localStorage.getItem('todos');
    if (a) {
      this.activeStateBehaviourSubject$.next(JSON.parse(a));
    }
    this.todoCollection = afs.collection<ITodo>('Todos');
    // this.Todos = this.todoCollection.valueChanges();
  }

  public activeStateBehaviourSubject$ = new BehaviorSubject<ITodo[]>([]);

  public activeUpdateBehaviourSubject$ = new BehaviorSubject<ITodo | null>(
    null
  );

  // guid = () => {
  //   let s4 = () => {
  //     return Math.floor((1 + Math.random()) * 0x10000)
  //       .toString(16)
  //       .substring(1);
  //   };
  //   //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  //   return (
  //     s4() +
  //     s4() +
  //     '-' +
  //     s4() +
  //     '-' +
  //     s4() +
  //     '-' +
  //     s4() +
  //     '-' +
  //     s4() +
  //     s4() +
  //     s4()
  //   );
  // };

  addTodoItem(item: string) {
    let todos = {
      id: this.afs.createId(),
      todoItem: item,
      status: false,
    };
    let todoArray = this.activeStateBehaviourSubject$.value;
    todoArray.push(todos);
    this.todoCollection.doc(todos.id).set(todos);
    console.log(this.todoCollection);
    this.activeStateBehaviourSubject$.next(todoArray);
    localStorage.setItem('todos', JSON.stringify(todoArray));
  }

  deleteTodoItem(id: string) {
    let todoArray = this.activeStateBehaviourSubject$.value;
    let index = todoArray.findIndex((item) => item.id === id);
    todoArray.splice(index, 1);
    this.todoCollection.doc(id).delete();
    this.activeStateBehaviourSubject$.next(todoArray);
    localStorage.setItem('todos', JSON.stringify(todoArray));
  }

  completeTodoItem(id: string) {
    let todoArray = this.activeStateBehaviourSubject$.value;
    let index = todoArray.findIndex((item) => item.id === id);
    todoArray[index].status = !todoArray[index].status;
    this.todoCollection.doc(id).update({ status: todoArray[index].status });
    this.activeStateBehaviourSubject$.next(todoArray);
    localStorage.setItem('todos', JSON.stringify(todoArray));
  }

  updateTodoItem(id: string | undefined, value: string) {
    let todoArray = this.activeStateBehaviourSubject$.value;
    let index = todoArray.findIndex((item) => item.id === id);
    todoArray[index].todoItem = value;
    this.todoCollection.doc(id).update({ todoItem: value });
    this.activeStateBehaviourSubject$.next(todoArray);
    localStorage.setItem('todos', JSON.stringify(todoArray));
  }
}
