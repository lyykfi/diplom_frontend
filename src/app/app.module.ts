import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ObjectsComponent } from './components/objects/index.component';
import { EditorComponent } from './components/editor/index.component';
import { PanelComponent } from './components/panel/index.component';


@NgModule({
  declarations: [
    AppComponent,
    ObjectsComponent,
    EditorComponent,
    PanelComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
