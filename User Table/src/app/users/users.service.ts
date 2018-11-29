import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { IUser } from "./user";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";

/** Service to retrieve the users and parse them */
@Injectable()
export class UsersService {
  constructor(private _http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this._http
      .get<IUser[]>("https://jsonplaceholder.typicode.com/users")
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
}
