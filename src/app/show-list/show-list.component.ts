import { Component, OnInit } from '@angular/core';
import { TodoServiceService } from '../todo-service.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  faClipboardCheck,
  faTrash,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { ITodo } from '../interfaces/todo.interface';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css'],
})
export class ShowListComponent implements OnInit {
  faClipboardCheck = faClipboardCheck as IconProp;
  faTrash = faTrash as IconProp;
  faEdit = faEdit as IconProp;
  flag = false;
  todos: ITodo[] = [];
  Todos: Observable<any>;

  // private TodoCollection: AngularFirestoreCollection<ITodo[]>;

  constructor(
    private _todoServices: TodoServiceService,
    firestore: AngularFirestore
  ) {
    this.Todos = firestore.collection('Todos').valueChanges();
    // this.TodoCollection = firestore.collection<ITodo[]>('Todos');
    // this.Todos = this.TodoCollection.snapshotChanges().pipe(
    //   map((actions) =>
    //     actions.map((a) => {
    //       const data = a.payload.doc.data();
    //       const id = a.payload.doc.id;
    //       return { id, ...data };
    //     })
    //   )
    // );

    this.Todos.subscribe((data) => {
      this.todos = data;
    });
  }

  ngOnInit(): void {}
  deleteTodo(id: string) {
    this._todoServices.deleteTodoItem(id);
  }
  completeTodo(id: string) {
    this._todoServices.completeTodoItem(id);
  }

  updateTodo(todo: ITodo) {
    this._todoServices.activeUpdateBehaviourSubject$.next(todo);
  }
}
