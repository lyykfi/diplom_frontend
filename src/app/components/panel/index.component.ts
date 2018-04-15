import { Component, OnInit } from '@angular/core';
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
@Component({
    selector: 'app-panel',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class PanelComponent implements OnInit {
    /**
     *
     */
    public selectedItem: IPanelItem | null;

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
        console.log(tool);
        this.selectedItem = tool;
    }
}
