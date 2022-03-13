import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-donation-selection-option',
  templateUrl: './donation-selection-option.component.html',
  styleUrls: ['./donation-selection-option.component.scss'],
})
export class DonationSelectionOptionComponent implements OnInit {
  @Input() donationType;
  @Output() selectedDonationType = new EventEmitter<string>();

  private donationOf: Array<string> = ["Blood", "Platelets", "Plasma"]
  private selectOptions: any;

  constructor() {
    this.selectOptions = {
      title: 'Select Donation Type',
      mode: 'ios'
    }
  }

  ngOnInit() { }

  onChange(event: any) {
    this.selectedDonationType.emit(event.detail.value);
  }
}
