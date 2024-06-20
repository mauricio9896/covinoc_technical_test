import { taskModel } from './../models/task.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2'


@Injectable({
  providedIn: 'root',
})
export class TaskService {

  private url: string = 'https://608adc0d737e470017b7410f.mockapi.io/api/v1/todos';
  private _refreshTask$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  get refreshTask$(): Observable<void> {
    return this._refreshTask$;
  }

  getTask(): Observable<taskModel[]> {
    return this.http.get<taskModel[]>(this.url);
  }

  createTask(task: taskModel): Observable<taskModel> {
    return this.http.post<taskModel>(this.url, task).pipe(tap(() => this._refreshTask$.next()));;
  }

  deleteTask(id: string): Observable<taskModel> {
    return this.http.delete<taskModel>(`${this.url}/${id}`).pipe(tap(() => this._refreshTask$.next()));;
  }

  successAlert(title: string): void {
    Swal.fire({
      icon: "success",
      title,
      showConfirmButton: false,
      timer: 1500
    });
  }

  errorAlert(text: string): void {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text,
      showConfirmButton: false,
      timer: 1500
    });
  }
}


