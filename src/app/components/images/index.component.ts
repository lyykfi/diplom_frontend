import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ImagesDialogsAddComponent } from './dialogs/add/index.component';
import { ImagesService, Images } from '../../images.service';
import { ConfigService, Config } from '../../config/config.service';

@Component({
  selector: 'app-images',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class ImagesComponent implements OnInit {
  /**
   *
   */
  images: Images[];

  /**
   *
   */
  config: Config;

  /**
   *
   * @param dialog
   */
  constructor(public dialog: MatDialog,
              public imagesService: ImagesService,
              public configService: ConfigService) {}

  /**
   *
   */
  async ngOnInit() {
    this.fetch();
  }

  private async fetch() {
    const result: any = await this.imagesService.all();
    const config: any = await this.configService.getConfig();

    this.images = result;
    this.config = config;
  }

  /**
   *
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(ImagesDialogsAddComponent, {
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
    await this.imagesService.remove(id);

    this.fetch();
  }
}
