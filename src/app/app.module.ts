import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { AccordComponent } from './accord/accord.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShowListComponent } from './show-list/show-list.component';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    TodoFormComponent,
    AccordComponent,
    ShowListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFirestoreModule.enablePersistence(),
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
