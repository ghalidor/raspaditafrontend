import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lfooter',
  templateUrl: './lfooter.component.html',
  styleUrls: ['./lfooter.component.css']
})
export class LfooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  abrirChat() {
    $('.chat-btn').click();

  }
}
