import { taskModel } from './../../models/task.model';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css'],
})
export class ListTaskComponent implements OnInit {
  public tasks: taskModel[] = [];
  public pageSize: number = 5;
  public currentPage: number = 1;
  public searchValue: string = '';
  private searchTermSubject = new Subject<taskModel>();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
    this.taskService.refreshTask$.subscribe(() => {
      this.getTasks();
    });

    this.searchTermSubject.pipe(
      debounceTime(600),
      distinctUntilChanged(),
    ).subscribe((task) => {
      this.updateTask(task);
    });
  }

  getTasks() {
    this.taskService.getTask().subscribe((data) => {
      this.tasks = data;
    });
  }

  onPageChanged(page: number) {
    this.currentPage = page;
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe((res) => {
      if (res) {
        this.taskService.successAlert('Tarea eliminada con éxito!');
      } else {
        return this.taskService.errorAlert(
          'Hubo un error al aliminar la tarea!'
        );
      }
    });
  }

  filtered(){
    this.currentPage = 1;
  }

  updateTask(task : taskModel){
    this.taskService.updateTask(task).subscribe((res)=>{
      this.taskService.successAlert('Tarea actualizada con éxito!');
    })
  }

  onChangeInput( task: taskModel) {
    this.searchTermSubject.next(task);
  }
}
