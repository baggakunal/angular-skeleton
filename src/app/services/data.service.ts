import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(private http: HttpClient) {

    }

    getOlympicWinners(): Observable<{ totalRecords: number, olympicWinners: Array<any> }> {
        return this.http.get(environment.olympicWinners).pipe(
            map((data: Array<any>) => {
                // Use this block to run ag grid as server side row model
                return { totalRecords: data.length, olympicWinners: data }

                // Use this block to run ag grid as client side row model
                // const filteredData = data.slice(0, 50);
                // return { totalRecords: filteredData.length, olympicWinners: filteredData }
            })
        );
    }
}
