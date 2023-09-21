import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lheader',
  templateUrl: './lheader.component.html',
  styleUrls: ['./lheader.component.css']
})
export class LheaderComponent implements OnInit {
  usu_nombre:String;
  constructor() { }

  ngOnInit(): void {
  }
  cerrarSesion(){
    //this.auth.logout();
  }
}
