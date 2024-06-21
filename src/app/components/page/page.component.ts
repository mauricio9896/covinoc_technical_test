import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  url : string = "https://github.com/mauricio9896/covinoc_technical_test/tree/master";

  constructor() { }

  ngOnInit(): void {
  }

}
