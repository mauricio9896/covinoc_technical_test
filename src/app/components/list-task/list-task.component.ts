import { taskModel } from './../../models/task.model';
import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {

  public tasks: taskModel[] = [];
  public pageSize: number = 5;
  public currentPage: number = 1;

  get paginatedTask() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.tasks.slice(startIndex, startIndex + this.pageSize);
  }

  constructor( private taskService : TaskService) { }


  ngOnInit(): void {
    this.taskService.getTask().subscribe((data) => {
      this.tasks = data;
    });
  }


  onPageChanged(page: number) {
    this.currentPage = page;
  }
}
