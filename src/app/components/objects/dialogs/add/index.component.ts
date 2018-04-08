import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ObjectsService } from 'app/objects.service';

@Component({
  selector: 'app-objects-dialog-add',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class ObjectsDialogsAddComponent {
    /**
     *
     */
    name = '';

    /**
     *
     */
    uploadedObject = '';

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
        public dialogRef: MatDialogRef<ObjectsDialogsAddComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private objectsService: ObjectsService) { }

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
    uploadObject(event): void {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.readAsBinaryString(event.target.files[0]);
        reader.onload = (onloadEvent: any) => {
            this.uploadedObject = btoa(onloadEvent.target.result);
        };
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
        await this.objectsService.add(this.name, this.uploadedObject, this.uploadedPreview);

        this.dialogRef.close();
    }
}
