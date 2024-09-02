import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public initialValue: string = '';
  public isLoading: boolean = false;
  constructor( private cService: CountriesService ) {}

  ngOnInit(): void {
    this.countries = this.cService.chachrStore.byCapital.countries;
    this.initialValue = this.cService.chachrStore.byCapital.term;
  };

  searchByCapital( term: string ): void {
    this.isLoading = true;
    this.cService.searchCapital( term )
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      })
  };
}
