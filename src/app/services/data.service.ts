import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable()
export class DataService {
  constructor(private httpClient: HttpClient) { }

  getItemsList(): Observable<any> {
    return this.httpClient
      .get(environment.itemsList)
      .pipe(map((response: any) => response && response.games));
  }
}
