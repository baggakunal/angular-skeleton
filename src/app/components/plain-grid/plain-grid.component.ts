import { Component, ViewEncapsulation } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

@Component({
    selector: 'plain-grid',
    templateUrl: './plain-grid.component.html',
    styleUrls: ['./plain-grid.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlainGridComponent {
    gridOptions: GridOptions = {
        columnDefs: [
            { headerName: 'Make', field: 'make', sortable: true, filter: true },
            { headerName: 'Model', field: 'model', sortable: true, filter: true },
            { headerName: 'Price', field: 'price', sortable: true, filter: true }
        ],
        defaultColDef: {
            flex: 1,
            minWidth: 200
        }
    };

    rowData = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];
}
