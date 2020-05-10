import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { GridOptions, GridApi, ColumnApi, IServerSideDatasource, IServerSideGetRowsParams } from 'ag-grid-community';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GroupedServerGridService } from './grouped-server-grid.service';

@Component({
    selector: 'grouped-server-grid',
    templateUrl: './grouped-server-grid.component.html',
    styleUrls: ['./grouped-server-grid.component.scss'],
    providers: [GroupedServerGridService],
    encapsulation: ViewEncapsulation.None
})
export class GroupedServerGridComponent implements OnInit, OnDestroy {
    private unsubscriber: Subject<any> = new Subject();
    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;
    private isServerSide: boolean = false;
    public initializeGrid: boolean = false;
    public isInitialDataLoad: boolean = true;

    public modules = [ServerSideRowModelModule, MenuModule, RowGroupingModule];
    public gridOptions: GridOptions;
    public rowData;

    constructor(private plainServerGridService: GroupedServerGridService) {

    }

    ngOnInit() {
        this.plainServerGridService.initialize().pipe(
            takeUntil(this.unsubscriber)
        ).subscribe((data) => {
            this.isServerSide = data.isServerSide;
            this.rowData = data.response.rows;
            this.gridOptions = this.plainServerGridService.getGridOptions(this.isServerSide);
            this.gridOptions.onGridReady = this.onGridReady.bind(this);
            this.initializeGrid = true;
        });
    }

    ngOnDestroy() {
        this.unsubscriber.next();
        this.unsubscriber.complete();
    }

    private onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        if (this.isServerSide) {
            const datasource = this.serverSideDatasource();
            params.api.setServerSideDatasource(datasource);
        }
    }

    private serverSideDatasource(): IServerSideDatasource {
        return {
            getRows: (params: IServerSideGetRowsParams) => {
                // , this.isInitialDataLoad
                this.plainServerGridService.getOlympicWinners(params.request).subscribe((response) => {
                    if (response.success) {
                        this.rowData = response.rows;
                        params.successCallback(response.rows, response.lastRow);
                    } else {
                        params.failCallback();
                    }
                }, () => {
                    this.isInitialDataLoad = false;
                }, () => {
                    this.isInitialDataLoad = false;
                });
            }
        };
    }
}
