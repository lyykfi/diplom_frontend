import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Objects } from 'app/services/objects.service';
import { IPanelItem } from './components/panel/index.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    /**
     *
     */
    selectedObject: Objects | null;

    /**
     *
     */
    selectedTool: IPanelItem | null;

    /**
     *
     */
    scene: any;

    /**
     *
     */
    camera: any;

    /**
     *
     */
    title = 'app';

    /**
     *
     * @param date
     */
    onUpdateObject(date: any) {
        this.selectedObject = date;
    }

    /**
     *
     * @param date
     */
    onUpdateTool(tool: any) {
        console.log('onUpdateTool');
        this.selectedTool = tool;
    }

    /**
     *
     * @param date
     */
    onUpdateScene(scene: any) {
        console.log('onUpdateScene2');
        this.scene = scene;
    }

    /**
     *
     * @param date
     */
    onUpdateCamera(camera: any) {
        console.log('camera');
        this.camera = camera;
    }
}
