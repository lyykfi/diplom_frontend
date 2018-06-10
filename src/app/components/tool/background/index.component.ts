import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as BABYLON from 'babylonjs';
import { FormGroup, FormControl } from '@angular/forms';

/**
 * FormModel
 */
class FormModel {
    color: string;
}

/**
 *
 */
@Component({
    selector: 'app-tool-background',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class ToolBackgroundComponent implements OnInit {
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
            color: new FormControl('#00FF00'),
        });
    }

    /**
     *
     */
    onSubmit(form: any) {
        console.log(form);
        const color = BABYLON.Color3.FromHexString(form.value.color);

        this.scene.meshes.forEach((item) => {
            if (item.material) {
                item.material.diffuseColor = color;
            }
        });

        // console.log(color);
        // const myDynamicTexture = new BABYLON.DynamicTexture('text', { width: textureSize, height: textureSize}, this.scene, true);
        /*const font = `normal ${this.value.fontSize}px ${this.value.font}`;

        myMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);

        const x = (textureSize / 100) * (dir.x * 100);
        const y = (textureSize / 100) * (dir.y * 100);

        // console.log((textureSize / (dir.x * 100)), (textureSize / (dir.y * 100)));
        myDynamicTexture.drawText(this.value.text, x, y, font, this.value.color, 'white', false, true);
        */
    }
}
