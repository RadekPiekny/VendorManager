import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ViewSwitcher } from '../../model/view-switcher.model';

@Component({
  selector: 'view-switcher',
  templateUrl: './view-switcher.component.html',
  styleUrls: ['./view-switcher.component.css']
})
export class ViewSwitcherComponent implements OnInit {
  @Input() data: ViewSwitcher[];
  @Output() value: EventEmitter<number> = new EventEmitter<number>();
  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  changeValue(viewSwitcher: ViewSwitcher) {
    this.data.forEach(vs =>{
      vs.active = false;
    })
    viewSwitcher.active = true;
    this.cd.detectChanges();
    this.value.emit(parseInt(viewSwitcher.value.toString()));
  }



}
