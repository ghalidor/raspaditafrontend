import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ElementRef, Input } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ticket } from 'src/app/module/ticket';
import { TicketService } from 'src/app/service/ticket/ticket.service';

@Component({
  selector: 'app-pagarticket',
  templateUrl: './pagarticket.component.html',
  styleUrls: ['./pagarticket.component.css']
})
export class PagarticketComponent implements OnInit {
  @Input() padre;
  ticket = new ticket();
  onCreateForm = this.formBuilder.group({
    'puntojuego_id': ['', Validators.compose([
      Validators.required
    ])],
    'credito': ['', Validators.compose([
      Validators.required
    ]),],
    'monto': ['', Validators.compose([
      Validators.required
    ])],
  });

  constructor(private spinnerService: NgxSpinnerService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private ticketService: TicketService) { }

  ngOnInit(): void {
  }

  buscar() {
    
  }

  generar() {
    
  }
}