import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-resumendia',
  templateUrl: './resumendia.component.html',
  styleUrls: ['./resumendia.component.css']
})
export class ResumendiaComponent implements OnInit {
  moment = moment;
  fecha: Date;
  constructor() { }

  ngOnInit(): void {
  }

}
