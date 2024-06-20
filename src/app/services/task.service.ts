import { taskModel } from './../models/task.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getTask(): Observable<taskModel[]> {
    const url: string =
      'https://608adc0d737e470017b7410f.mockapi.io/api/v1/todos';
    return this.http.get<taskModel[]>(url);
  }
}
