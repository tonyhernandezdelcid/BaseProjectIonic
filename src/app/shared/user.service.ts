import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }
  addUser(user: User): Observable<any> {
    return this.http.post<User>('http://localhost:8080/baseprojectapi/crearusuario', user, this.httpOptions)
      .pipe(
        catchError(this.handleError<User>('Add User'))
      );
  }

  getUser(id:any): Observable<User> {
    return this.http.get<User>('http://localhost:8080/baseprojectapi/verusrindividual/' + id)
      .pipe(
        tap(_ => console.log(`User fetched: ${id}`)),
        catchError(this.handleError<User>(`Get User id=${id}`))
      );
  }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8080/baseprojectapi/consultausuarios')
      .pipe(
        tap(songs => console.log('Users fetched!')),
        catchError(this.handleError<User[]>('Get Users', []))
      );
  }


  updateUser(id:any, user: User): Observable<any> {
    return this.http.put('http://localhost:8080/baseprojectapi/modificarusuario', user, this.httpOptions)
      .pipe(
        tap(_ => console.log(`User updated: ${id}`)),
        catchError(this.handleError<User[]>('Update User'))
      );
  }

  deleteUser(id:any): Observable<User[]> {
    return this.http.delete<User[]>('http://localhost:8080/baseprojectapi/eliminausuario/'+'' + id, this.httpOptions)
      .pipe(
        tap(_ => console.log(`User deleted: ${id}`)),
        catchError(this.handleError<User[]>('Delete User'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
