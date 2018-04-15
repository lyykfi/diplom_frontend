import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ObjectsDialogsAddComponent } from './dialogs/add/index.component';
import { ObjectsService, Objects } from 'app/services/objects.service';
import { ConfigService, Config } from '../../config/config.service';

@Component({
  selector: 'app-objects',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class ObjectsComponent implements OnInit {
  @Input('selectedObject') selectedObject: Objects | null;

  @Output() updateObject: EventEmitter<any> = new EventEmitter<any>();

  /**
   *
   */
  objects: Objects[];

  /**
   *
   */
  config: Config;

  /**
   *
   * @param dialog
   */
  constructor(public dialog: MatDialog,
              public objectsService: ObjectsService,
              public configService: ConfigService) {}

  /**
   *
   */
  async ngOnInit() {
    this.fetch();
  }

  private async fetch() {
    const result: any = await this.objectsService.all();
    const config: any = await this.configService.getConfig();

    this.objects = result;
    this.config = config;
  }

  /**
   *
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(ObjectsDialogsAddComponent, {
      width: '250px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetch();
    });
  }

  /**
   *
   * @param image
   */
  private getImagePath(image: string) {
    return this.config.basePath + image;
  }

  private async delete(id: string) {
    await this.objectsService.remove(id);

    this.fetch();
  }

  private selectObject(objects: Objects) {
    this.selectedObject = objects;

    this.updateObject.emit(this.selectedObject);
  }
}
