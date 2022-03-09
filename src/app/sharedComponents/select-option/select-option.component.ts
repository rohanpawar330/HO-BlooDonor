import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss'],
})
export class SelectOptionComponent implements OnInit {

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
