import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ImagesService } from 'app/services/images.service';

@Component({
  selector: 'app-images-dialog-add',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class ImagesDialogsAddComponent {
    /**
     *
     */
    name = '';

    /**
     *
     */
    uploadedPreview = '';

    /**
     *
     * @param dialogRef
     * @param data
     */
    constructor(
        public dialogRef: MatDialogRef<ImagesDialogsAddComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private imagesService: ImagesService) { }

    /**
     *
     */
    onNoClick(): void {
        this.dialogRef.close();
    }

    /**
     *
     * @param event
     */
    uploadPreview(event): void {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.readAsBinaryString(event.target.files[0]);
        reader.onload = (onloadEvent: any) => {
            this.uploadedPreview = btoa(onloadEvent.target.result);
        };
    }

    /**
     *
     */
    async upload() {
        await this.imagesService.add(this.name, this.uploadedPreview);

        this.dialogRef.close();
    }
}
