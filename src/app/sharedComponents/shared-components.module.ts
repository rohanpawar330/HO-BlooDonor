import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsCardComponent } from './user-details-card/user-details-card.component';
import { SelectOptionComponent } from './select-option/select-option.component';



@NgModule({
  declarations: [UserDetailsCardComponent, SelectOptionComponent],
  imports: [
    CommonModule
  ],
  exports: [UserDetailsCardComponent, SelectOptionComponent]
})
export class SharedComponentsModule { }
