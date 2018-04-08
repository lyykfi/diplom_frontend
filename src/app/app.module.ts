import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { ObjectsComponent } from './components/objects/index.component';
import { ObjectsDialogsAddComponent } from './components/objects/dialogs/add/index.component';
import { EditorComponent } from './components/editor/index.component';
import { PanelComponent } from './components/panel/index.component';

import { ObjectsService } from './objects.service';
import { ConfigService } from './config/config.service';

@NgModule({
  declarations: [
    AppComponent,
    ObjectsComponent,
    EditorComponent,
    PanelComponent,
    ObjectsDialogsAddComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ],
  providers: [
    ObjectsService,
    ConfigService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ObjectsDialogsAddComponent
  ]
})
export class AppModule { }
