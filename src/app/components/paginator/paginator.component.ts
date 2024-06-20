import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent {
  @Input() pageSize !: number;
  @Input() currentPage !: number;
  @Input() totalItems !: number;

  @Output() pageChanged = new EventEmitter<number>()

  get totalPages(): number{
    return Math.ceil(this.totalItems / this.pageSize);
  }


  constructor() { }

  onPageChange(page: number) {
    this.pageChanged.emit(page);
  }
}
