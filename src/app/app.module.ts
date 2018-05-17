import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from 'app/app.component';
import { ObjectsComponent } from 'app/components/objects/index.component';
import { ObjectsDialogsAddComponent } from 'app/components/objects/dialogs/add/index.component';
import { EditorComponent } from 'app/components/editor/index.component';
import { PanelComponent } from 'app/components/panel/index.component';

import { ImagesComponent } from 'app/components/images/index.component';
import { ImagesDialogsAddComponent } from 'app/components/images/dialogs/add/index.component';

import { ObjectsService } from 'app/services/objects.service';
import { ImagesService } from 'app/services/images.service';
import { ConfigService } from 'app/config/config.service';
import { ToolComponent } from './components/tool/index.component';
import { ToolTextComponent } from './components/tool/text/index.component';
import { ToolBackgroundComponent } from './components/tool/background/index.component';

@NgModule({
  declarations: [
    AppComponent,
    ObjectsComponent,
    EditorComponent,
    PanelComponent,
    ObjectsDialogsAddComponent,
    ImagesComponent,
    ImagesDialogsAddComponent,
    ToolComponent,
    ToolTextComponent,
    ToolBackgroundComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
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
    ImagesService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ObjectsDialogsAddComponent,
    ImagesDialogsAddComponent
  ]
})
export class AppModule { }
