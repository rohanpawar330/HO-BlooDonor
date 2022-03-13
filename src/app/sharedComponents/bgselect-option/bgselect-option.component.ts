import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-bgselect-option',
  templateUrl: './bgselect-option.component.html',
  styleUrls: ['./bgselect-option.component.scss'],
})
export class BGSelectOptionComponent implements OnInit {
  @Input() bloodGroup;
  @Output() bloodGroupSelected = new EventEmitter<string>();

  private bloodGroupList: Array<string> = ["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"]
  private selectOptions: any;

  constructor() {
    this.selectOptions = {
      title: 'Select Blood Group',
      mode: 'ios'
    }
  }

  ngOnInit() { }

  onChange(event: any) {
    this.bloodGroupSelected.emit(event.detail.value);
  }
}
