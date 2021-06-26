import { Component, OnInit } from '@angular/core';
import { Sala } from 'src/app/models/sala.model';
import { SalaService } from 'src/app/services/sala.service';

@Component({
  selector: 'app-salas',
  templateUrl: './salas.page.html',
  styleUrls: ['./salas.page.scss'],
})
export class SalasPage implements OnInit {

  texto = '';

  salas: Sala[];

  constructor(private salaService: SalaService) { }

  ngOnInit() {
    this.salaService.getSalas().subscribe(
      salas => {
        this.salas = salas;
      }
    )
  }

  buscar( event ){
    this.texto = event.detail.value;
  }

}
