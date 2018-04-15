import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Objects } from 'app/services/objects.service';
import * as THREE from 'three';
import OBJLoader from 'three-obj-loader';
import { ConfigService, Config } from '../../config/config.service';

@Component({
  selector: 'app-editor',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class EditorComponent implements OnChanges, OnInit {

  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  @Input('selectedObject') selectedObject: Objects | null;

  scene: any;

  /**
   *
   */
  config: Config;

  constructor(public configService: ConfigService) {}

  ngOnChanges(): void {
    if (this.selectedObject) {
      const manager = new THREE.LoadingManager();
      const loader = new THREE.OBJLoader(manager);
      const self = this;

      console.log(this.config);

      loader.load(
          // resource URL
          this.config.basePath + this.selectedObject.object,

          // onLoad callback
          // Here the loaded data is assumed to be an object
          function ( obj ) {
            obj.position.x = - 60;
            obj.rotation.x = 20 * Math.PI / 180;
            obj.rotation.z = 20 * Math.PI / 180;
            obj.scale.x = 30;
            obj.scale.y = 30;
            obj.scale.z = 30;

            self.scene.add( obj );
          },

          // onProgress callback
          function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
          },

          // onError callback
          function ( err ) {
            console.error( 'An error happened' );
          }
      );
    }
  }

  async ngOnInit() {
    const config: any = await this.configService.getConfig();

    this.config = config;

    OBJLoader(THREE);

    const editor = document.getElementById('editor_inline');
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 45, editor.offsetWidth / editor.offsetHeight, 1, 2000 );
    this.camera.aspect = editor.offsetWidth / window.innerHeight;
    this.camera.position.z = 600;
    this.camera.updateProjectionMatrix();
    const ambient = new THREE.AmbientLight( 0x101030 );
    this.scene.add( ambient );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( editor.offsetWidth, window.innerHeight );
    editor.appendChild( this.renderer.domElement );

    window.addEventListener( 'resize', this.onWindowResize.bind(this), false );

    this.animate();
  }

  animate() {
    requestAnimationFrame( this.animate.bind(this) );
    this.render();
  }

  render() {
    this.camera.lookAt( this.scene.position );

    this.renderer.render( this.scene, this.camera );
  }

  onWindowResize() {
    const editor = document.getElementById('editor_inline');

    const windowHalfX = editor.offsetWidth / 2;
    const windowHalfY = editor.offsetHeight / 2;

    this.camera.aspect = editor.offsetWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( editor.offsetWidth, window.innerHeight );
  }
}
