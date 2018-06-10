import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { Objects } from 'app/services/objects.service';
import { ConfigService, Config } from '../../config/config.service';
import { IPanelItem, IPanelItemType } from '../panel/index.component';
import * as BABYLON from 'babylonjs';
import * as moment from 'moment';

import 'babylonjs-loaders';
import 'babylonjs-serializers';

@Component({
  selector: 'app-editor',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class EditorComponent implements OnChanges, OnInit {
  /**
   *
   */
  @Input('selectedObject') selectedObject: Objects | null;

  /**
   *
   */
  @Input('selectedTool') selectedTool: IPanelItem | null;

  /**
   *
   */
  @Output() updateScene: EventEmitter<any> = new EventEmitter<any>();

  /**
   *
   */
  @Output() updateCamera: EventEmitter<any> = new EventEmitter<any>();

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
  engine: any;

  /**
   *
   */
  config: Config;

  /**
   * @method constructor
   * @param configService
   */
  constructor(public configService: ConfigService) {}

  /**
   * @method ngOnChanges
   */
  async ngOnChanges(changes) {
    if (changes.selectedObject && this.config) {
      const objPath = this.config.basePath + this.selectedObject.object;
      const objFileArray = objPath.split('/');
      const objFilePath = objFileArray[objFileArray.length - 1];

      BABYLON.SceneLoader.Load(objPath.replace(`${objFilePath}`, ''), objFilePath, this.engine,  (scene) => {
        scene.createDefaultCameraOrLight(true, true, true);

        const myMaterial = new BABYLON.StandardMaterial('Material', scene);

        scene.meshes.forEach((item) => {
            item.material = myMaterial;
        });

        this.scene = scene;

        this.updateScene.emit(this.scene);
        this.updateCamera.emit(this.camera);
      });
    }
  }

  /**
   * @method ngOnInit
   */
  async ngOnInit() {
    const config: any = await this.configService.getConfig();
    this.config = config;

    if (!this.engine) {
      this.createScene();

      this.engine.runRenderLoop(() => {
        this.scene.render();
      });

      window.addEventListener('resize', () => {
        this.engine.resize();
      });
    }
  }

  /**
   * @method createScene
   */
  private createScene() {
    const canvas = document.getElementById('editor_inline');

    if (canvas) {
      this.engine = new BABYLON.Engine(canvas as HTMLCanvasElement, true);
      this.scene = new BABYLON.Scene(this.engine);

      this.camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 5, -10), this.scene);
      this.camera.setTarget(BABYLON.Vector3.Zero());

      console.log('updateCamera 1');

      this.updateCamera.emit(this.camera);
    }
  }

  /**
   * @method export
   */
  private export() {
    const timestamp = moment().format();

    const objFile = BABYLON.OBJExport.OBJ(this.scene.meshes, this.scene.materials, timestamp);
    const newMesh = BABYLON.Mesh.MergeMeshes(this.scene.meshes);

    const mtl = BABYLON.OBJExport.MTL(newMesh);

    this.fileSave(`${timestamp}.obj`, objFile);
    this.fileSave(`${timestamp}.mtl`, mtl);
  }

  /**
   *
   * @param name
   * @param text
   */
  private fileSave(name: string, text: any) {
    const a = document.createElement('a');
    const file = new Blob([text]);

    a.setAttribute('href', URL.createObjectURL(file));
    a.setAttribute('download', name);

    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
        document.body.removeChild(a);
    }, 0);
  }
}
