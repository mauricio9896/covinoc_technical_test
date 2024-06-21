import { taskModel } from './../../models/task.model';
import { Component, OnInit } from '@angular/core';
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

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
    this.taskService.refreshTask$.subscribe(() => {
      this.getTasks();
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
    task.inputFocused = undefined;
    this.taskService.updateTask(task).subscribe(()=>{
      this.taskService.successAlert('Tarea actualizada con éxito!');
    })
  }

  onFocus( task : taskModel) {
    task['inputFocused'] = true;
  }

  onBlur( task : taskModel) {
    setTimeout(() => {
      task['inputFocused'] = false;
    }, 150);
  }
}
