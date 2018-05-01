import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Objects } from 'app/services/objects.service';
import { ConfigService, Config } from '../../config/config.service';
import { IPanelItem, IPanelItemType } from '../panel/index.component';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

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
  scene: any;

  /**
   *
   */
  renderer: THREE.WebGLRenderer;

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
    if (changes.selectedObject) {
      const objPath = this.config.basePath + this.selectedObject.object;
      const objFileArray = objPath.split('/');
      const objFilePath = objFileArray[objFileArray.length - 1];

      BABYLON.SceneLoader.Load(objPath.replace(`${objFilePath}`, ''), objFilePath, this.engine,  (scene) => {
        scene.createDefaultCameraOrLight(true, true, true);

        this.scene = scene;
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
    }
  }
}
