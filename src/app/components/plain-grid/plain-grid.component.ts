import { Component, ViewEncapsulation } from '@angular/core';
import { GridOptions, ColDef } from 'ag-grid-community';

@Component({
    selector: 'plain-grid',
    templateUrl: './plain-grid.component.html',
    styleUrls: ['./plain-grid.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlainGridComponent {
    gridOptions: GridOptions = {
        embedFullWidthRows: true
    };

    columnDefs: Array<ColDef> = [
        { headerName: 'Make', field: 'make', sortable: true, filter: true },
        { headerName: 'Model', field: 'model', sortable: true, filter: true },
        { headerName: 'Price', field: 'price', sortable: true, filter: true }
    ];

    rowData = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];
}
