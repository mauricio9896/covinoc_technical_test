import { taskModel } from './../models/task.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'


@Injectable({
  providedIn: 'root',
})
export class TaskService {

  private url: string = 'https://608adc0d737e470017b7410f.mockapi.io/api/v1/todos';

  constructor(private http: HttpClient) {}

  getTask(): Observable<taskModel[]> {
    return this.http.get<taskModel[]>(this.url);
  }

  createTask(task: taskModel): Observable<taskModel> {
    return this.http.post<taskModel>(this.url, task);
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
