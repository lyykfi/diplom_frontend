import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Items from './elements';

/**
 *
 */
export interface IPanelItem {
    id: string;
    icon: string;
}

/**
 *
 */
export enum IPanelItemType {
    MOVE = 'MOVE',
    ROTATE = 'ROTATE',
    DRAW = 'DRAW',
    ZOOM = 'ZOOM',
}

/**
 *
 */
@Component({
    selector: 'app-panel',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class PanelComponent implements OnInit {
    /**
     *
     */
    @Input('selectedTool') selectedTool: IPanelItem | null;

    /**
     *
     */
    @Output() updateTool: EventEmitter<any> = new EventEmitter<any>();

    /**
     *
     */
    public items: IPanelItem[];

    /**
     *
     */
    public ngOnInit(): void {
        this.items = Items;
    }

    /**
     *
     * @param tool
     */
    private selectTool(tool: IPanelItem) {
        this.selectedTool = tool;

        this.updateTool.emit(this.selectedTool);
    }
}
