import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as BABYLON from 'babylonjs';
import { FormGroup, FormControl } from '@angular/forms';

/**
 * FormModel
 */
class FormModel {
    text: string;
}

/**
 *
 */
@Component({
    selector: 'app-tool-text',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class ToolTextComponent implements OnInit {
    /**
     *
     */
    myForm: FormGroup;

    value: any;

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
     */
    ngOnInit(): void {
        this.myForm = new FormGroup({
            font: new FormControl('monospace'),
            text: new FormControl(''),
            fontSize: new FormControl(22),
            color: new FormControl('green'),
        });
    }

    /**
     *
     */
    onSubmit(form: any) {
        this.value = form.value;

        document.body.style.cursor = 'crosshair';

        window.addEventListener('click', this.handleClick);
    }

    /**
     *
     */
    private handleClick = () => {
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

            const myDynamicTexture = new BABYLON.DynamicTexture('text', { width: textureSize, height: textureSize}, this.scene, true);
            const font = `normal ${this.value.fontSize}px ${this.value.font}`;

            this.scene.meshes.forEach((item) => {
                item.material.diffuseTexture = myDynamicTexture;
            });

            const x = (textureSize / 100) * (dir.x * 100);
            const y = (textureSize / 100) * (dir.y * 100);

            // console.log((textureSize / (dir.x * 100)), (textureSize / (dir.y * 100)));
            myDynamicTexture.drawText(this.value.text, null, null, font, this.value.color, 'white', false, true);

        }

        window.removeEventListener('click', this.handleClick);
    }
}
