import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-form-task',
  templateUrl: './form-task.component.html',
  styleUrls: ['./form-task.component.css'],
})
export class FormTaskComponent {
  public loading: boolean = false;

  public taskForm = this.fb.group({
    title: [null, Validators.required],
    state: [false, [Validators.required]],
  });

  constructor(private fb: FormBuilder, private taskService: TaskService) {}

  submmitTask() {
    this.taskForm.markAllAsTouched();
    if (this.taskForm.invalid) return;
    this.loading = true;
    this.taskService.createTask(this.taskForm.value).subscribe((res) => {
      this.loading = false;
      if (res) {
        this.taskService.successAlert('Tarea creada con éxito!');
        this.taskForm.patchValue({
          title: null,
          state: false,
        });
      }else{
        return this.taskService.errorAlert('Hubo un error al crear la tarea!');
      }
    });
  }
}
