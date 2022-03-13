import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-gender-selection-option',
  templateUrl: './gender-selection-option.component.html',
  styleUrls: ['./gender-selection-option.component.scss'],
})
export class GenderSelectionOptionComponent implements OnInit {
  @Input() gender;
  @Output() genderSelected = new EventEmitter<string>();

  private genders: Array<string> = ["Male", "Female"]
  private selectOptions: any;

  constructor() {
    this.selectOptions = {
      title: 'Select Gender',
      mode: 'ios'
    }
  }

  ngOnInit() { }

  onChange(event: any) {
    this.genderSelected.emit(event.detail.value);
  }
}
