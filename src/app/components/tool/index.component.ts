import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPanelItem } from '../panel/index.component';


/**
 *
 */
@Component({
    selector: 'app-tool',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class ToolComponent {
    /**
     *
     */
    @Input('selectedTool') selectedTool: IPanelItem | null;
}
