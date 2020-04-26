import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable()
export class DataService {
  constructor(private httpClient: HttpClient) { }

  getGamesList(): Observable<any> {
    return this.httpClient.get(environment.gamesList);
  }
}
