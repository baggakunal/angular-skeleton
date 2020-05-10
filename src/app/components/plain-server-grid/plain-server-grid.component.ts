import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridOptions, GridApi, ColumnApi, IServerSideDatasource, IServerSideGetRowsParams } from 'ag-grid-community';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { FakeServer } from '../../services/fake-server';

@Component({
    selector: 'plain-server-grid',
    templateUrl: './plain-server-grid.component.html',
    styleUrls: ['./plain-server-grid.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlainServerGridComponent {
    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public modules = [
        ServerSideRowModelModule,
        MenuModule
    ];

    gridOptions: GridOptions = {
        columnDefs: [
            {
                field: 'athlete',
                type: 'text',
                minWidth: 220
            },
            {
                field: 'country',
                type: 'text',
                minWidth: 200,
                suppressMenu: true
            },
            {
                field: 'year',
                filter: 'agNumberColumnFilter',
                filterParams: {
                    resetButton: true,
                    debounceMs: 1000,
                    suppressAndOrCondition: true
                }
            },
            {
                field: 'sport',
                type: 'text',
                minWidth: 200,
                suppressMenu: true
            },
            {
                field: 'gold',
                type: 'number'
            },
            {
                field: 'silver',
                type: 'number'
            },
            {
                field: 'bronze',
                type: 'number'
            },
        ],
        defaultColDef: {
            flex: 1,
            minWidth: 100,
            sortable: true,
            menuTabs: ['filterMenuTab']
        },
        columnTypes: {
            text: { filter: 'agTextColumnFilter' },
            number: { filter: 'agNumberColumnFilter' },
            numberWithFilterReset: {
                filter: 'agNumberColumnFilter',
                filterParams: {
                    resetButton: true,
                    debounceMs: 1500,
                },
            }
        },
        rowModelType: 'serverSide',
        cacheBlockSize: 100,
        blockLoadDebounceMillis: 100,
        maxBlocksInCache: 10,
        debug: true,
        onGridReady: this.onGridReady.bind(this)
    };

    rowData = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
    ];

    constructor(private http: HttpClient) {

    }

    private onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        this.http.get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json').subscribe(data => {
            const fakeServer = FakeServer(data);
            const datasource = this.serverSideDatasource(fakeServer);
            params.api.setServerSideDatasource(datasource);
        });
    }

    serverSideDatasource(server): IServerSideDatasource {
        return {
            getRows: (params: IServerSideGetRowsParams) => {
                const response = server.getData(params.request);
                setTimeout(function () {
                    if (response.success) {
                        params.successCallback(response.rows, response.lastRow);
                    } else {
                        params.failCallback();
                    }
                }, 500);
            },
        };
    }
}
