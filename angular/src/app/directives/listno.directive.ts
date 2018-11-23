import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appListno]'
})
export class ListnoDirective implements OnInit{
  @Input()
  set appListno(context: any) {

  }

  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnInit () {
  }

}
