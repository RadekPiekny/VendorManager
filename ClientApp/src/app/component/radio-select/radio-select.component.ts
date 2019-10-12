import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RadioSelect } from '../../model/radio.select.model';

@Component({
  selector: 'radio-select',
  templateUrl: './radio-select.component.html',
  styleUrls: ['./radio-select.component.css']
})
export class RadioSelectComponent implements OnInit {
  @Input() data: RadioSelect[];
  @Output() value: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  changeValue(val: number) {
    this.value.emit(parseInt(val.toString())); 
  }

}
