import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay, switchMap, map } from 'rxjs/operators';
import { IServerSideGetRowsRequest, GridOptions } from 'ag-grid-community';
import { DataService } from '../../services/data.service';
import { FakeServer } from './fake-server';

const DEFAULT_GRID_OPTIONS: GridOptions = {
    cacheBlockSize: 100,
}

@Injectable()
export class GroupedServerGridService {
    private fakeServer;
    private initialResponse;

    constructor(private dataService: DataService) {

    }

    initialize(): Observable<{ response: { success: boolean, rows: Array<any>, lastRow: number }, isServerSide: boolean }> {
        return this.dataService.getOlympicWinners().pipe(
            tap((data) => {
                this.fakeServer = FakeServer(data);
            }),
            switchMap(() => {
                const defaultRequest: IServerSideGetRowsRequest = {
                    startRow: 0,
                    endRow: (DEFAULT_GRID_OPTIONS.cacheBlockSize || 100),
                    rowGroupCols: [],
                    valueCols: [],
                    pivotCols: [],
                    pivotMode: false,
                    groupKeys: [],
                    filterModel: [],
                    sortModel: []
                };

                return this.getOlympicWinners(defaultRequest);
            }),
            map((response) => {
                return { response: response, isServerSide: response.lastRow > response.rows.length };
            })
        );
    }

    getGridOptions(isServerSide: boolean): GridOptions {
        let gridOptions: GridOptions = {
            columnDefs: [
                {
                    colId: 'country',
                    valueGetter: 'data.country',
                    rowGroup: true,
                    hide: true
                },
                {
                    field: 'sport',
                    rowGroup: true,
                    hide: true
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
                    field: 'gold',
                    type: 'number',
                    aggFunc: 'sum'
                },
                {
                    field: 'silver',
                    type: 'number',
                    aggFunc: 'sum'
                },
                {
                    field: 'bronze',
                    type: 'number',
                    aggFunc: 'sum'
                }
            ],
            defaultColDef: {
                flex: 1,
                minWidth: 100,
                sortable: true,
                menuTabs: ['filterMenuTab']
            },
            autoGroupColumnDef: {
                headerName: "Country",
                flex: 1,
                minWidth: 280,
                suppressMenu: true
            },
            groupDefaultExpanded: -1,
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
            }
        };

        if (isServerSide) {
            gridOptions = Object.assign({}, gridOptions, {
                rowModelType: 'serverSide',
                cacheBlockSize: DEFAULT_GRID_OPTIONS.cacheBlockSize,
                blockLoadDebounceMillis: 100,
                maxBlocksInCache: 10,
                serverSideSortingAlwaysResets: true,
                debug: true
            });
        }

        return gridOptions;
    }

    getOlympicWinners(request: IServerSideGetRowsRequest, isInitialDataLoad: boolean = false): Observable<{ success: boolean, rows: Array<any>, lastRow: number }> {
        if (isInitialDataLoad) {
            return of(this.initialResponse);
        }

        return of(this.fakeServer.getData(request)).pipe(
            tap((response) => {
                this.initialResponse = response;
            }),
            delay(500)
        );
    }
}
