import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Objects } from './objects.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedObject: Objects | null;

  title = 'app';

  onUpdateObject(date: any) {
    this.selectedObject = date;
  }
}
