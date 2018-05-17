import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ImagesDialogsAddComponent } from './dialogs/add/index.component';
import { ImagesService, Images } from 'app/services/images.service';
import { ConfigService, Config } from 'app/config/config.service';

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
     */
    @Input('scene') scene: any;

    /**
     *
     */
    @Input('camera') camera: any;

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

    /**
     *
     */
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

    /**
     *
     * @param id
     */
    private async delete(id: string) {
        await this.imagesService.remove(id);

        this.fetch();
    }

    /**
     *
     * @param image
     */
    private addImage(image) {
        console.log(image);
        document.body.style.cursor = 'crosshair';

        setTimeout(() => {
            window.addEventListener('click', this.handleClick.bind(this, image));
        }, 0);
    }

    /**
     *
     */
    private handleClick = (image) => {
        const { rotation } = this.camera;

        // We try to pick an object
        const pickResult = this.scene.pick(this.scene.pointerX, this.scene.pointerY);

        document.body.style.cursor = 'default';

        if (pickResult && pickResult.hit) {
            const { pickedPoint } = pickResult;
            const textureSize = 256;
            const dir = pickResult.pickedPoint.subtract(this.scene.activeCamera.position);
            dir.normalize();

            console.log(dir);

            const myDynamicTexture = new BABYLON.Texture(this.config.basePath + image, this.scene);

            this.scene.meshes.forEach((item) => {
                item.material.diffuseTexture = myDynamicTexture;
            });

            // const x = (textureSize / 100) * (dir.x * 100);
            // const y = (textureSize / 100) * (dir.y * 100);

            // console.log((textureSize / (dir.x * 100)), (textureSize / (dir.y * 100)));
            // myDynamicTexture.drawText(this.value.text, null, null, font, this.value.color, 'white', false, true);

        }

        window.removeEventListener('click', this.handleClick);
    }
}
