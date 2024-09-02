import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private deBouncer: Subject<string> = new Subject();
  private deBouncerSuscription?: Subscription

  @Input()
  public placeholder: string =  '';

  @Input()
  public initialValue: string =  '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.deBouncerSuscription = this.deBouncer
    .pipe(
      debounceTime( 350 )
    )
    .subscribe( value => {
      this.onDebounce.emit( value );
    });
  };

  ngOnDestroy(): void {
    this.deBouncerSuscription?.unsubscribe();
  };

  emiterValue( value: string ): void {
    this.onValue.emit( value );
  };

  onKeyPress( searchTerm: string ): void {
    this.deBouncer.next( searchTerm );
  }
}
