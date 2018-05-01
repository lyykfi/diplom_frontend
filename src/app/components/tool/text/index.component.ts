import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
export class ToolTextComponent {
    model = new FormModel();

    addText() {
        console.log(this.model);
    }
}
