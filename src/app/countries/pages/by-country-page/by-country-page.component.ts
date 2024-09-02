import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor( private cService: CountriesService ) {}

  ngOnInit(): void {
    this.countries = this.cService.chachrStore.byCountries.countries;
    this.initialValue = this.cService.chachrStore.byCountries.term;
  }
;

  searchByCountry( term: string ): void {
    this.isLoading = true;
    this.cService.searchCountry( term )
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      })

  };

};
