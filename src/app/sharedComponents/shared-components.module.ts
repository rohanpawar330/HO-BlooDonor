import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsCardComponent } from './user-details-card/user-details-card.component';
import { BGSelectOptionComponent } from './bgselect-option/bgselect-option.component';
import { GenderSelectionOptionComponent } from './gender-selection-option/gender-selection-option.component';
import { DonationSelectionOptionComponent } from './donation-selection-option/donation-selection-option.component';

@NgModule({
  declarations: [UserDetailsCardComponent, BGSelectOptionComponent, GenderSelectionOptionComponent, DonationSelectionOptionComponent],
  imports: [
    CommonModule
  ],
  exports: [UserDetailsCardComponent, BGSelectOptionComponent, GenderSelectionOptionComponent, DonationSelectionOptionComponent]
})
export class SharedComponentsModule { }
