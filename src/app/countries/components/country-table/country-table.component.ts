import { Component, Input } from '@angular/core';
import { Country, PruebaBot } from '../../interfaces/country';

@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  styles: [`img { width: 30px  }`]
})
export class CountryTableComponent {

  @Input()
  public countries: Country[] = [];



  public prueba_bot: PruebaBot[] = []
}


/*
  export interface PruebaBot {
    pais: string;
    telefono: string;
    nombre: string;
    idBot: string;
    idIntc: string;
  }

*/
