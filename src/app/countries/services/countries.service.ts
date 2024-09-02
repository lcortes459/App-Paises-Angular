import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public chachrStore: CacheStore = {
    byCapital   : { term: '', countries: [] },
    byCountries : { term: '', countries: [] },
    byRegion    : { region: '', countries: [] }
  };

  constructor( private http: HttpClient ) {
    this.loadFromToLocalStorage();
  };

  private saveToLocalStorage() {
    localStorage.setItem( 'cacheStore', JSON.stringify( this.chachrStore ) );
  };

  private loadFromToLocalStorage() {
    if( !localStorage.getItem( 'cacheStore' ) ) return;

    this.chachrStore = JSON.parse( localStorage.getItem( 'cacheStore' )! );
  };

  private getCountryRequest( url: string ): Observable<Country[]> {
    return this.http.get<Country[]>( url )
    .pipe(
      catchError( () => of( [] )),
      // delay( 2000 ),
    );
  };
  searchCountryByAlphaCode( code: string ): Observable<Country | null> {
    const url = `${ this.apiUrl }/alpha/${ code }`;
    return this.http.get<Country[]>( url )
      .pipe(
        map( countries => countries.length > 0 ? countries[0]: null ),
        catchError( () => of( null )
      )
    );
  };

  searchCapital( term: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/capital/${ term }`;
    return this.getCountryRequest( url )
      .pipe(
        tap( countries => this.chachrStore.byCapital = { term, countries } ),
        tap( () => this.saveToLocalStorage() ),
      )
  };

  searchCountry( term: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/name/${ term }`;
    return this.getCountryRequest( url )
      .pipe(
        tap( countries => this.chachrStore.byCountries = { term, countries } ),
        tap( () => this.saveToLocalStorage() ),
      )
  };

  searchRegion( region: Region ): Observable<Country[]> {
    const url = `${ this.apiUrl }/region/${ region }`;
    return this.getCountryRequest( url )
      .pipe(
        tap( countries => this.chachrStore.byRegion = { region, countries } ),
        tap( () => this.saveToLocalStorage() ),
      )
  };
};
