import { taskModel } from './../models/task.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTask',
})
export class SearchTaskPipe implements PipeTransform {
  transform(
    value: taskModel[],
    search: string,
    currentPage: number
  ): taskModel[] {
    if (search === '') return this.paginatedTask(value, currentPage);

    let tasksFiltered: taskModel[] = [];
    value.forEach((task) => {
      if (
        task.title.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
        task.id.toLowerCase().indexOf(search.toLowerCase()) > -1
      ) {
        tasksFiltered.push(task);
      }
    });
    return this.paginatedTask(tasksFiltered, 1);
  }

  paginatedTask(tasks: taskModel[], currentPage: number): taskModel[] {
    const startIndex = (currentPage - 1) * 5;
    return tasks.slice(startIndex, startIndex + 5);
  }
}
