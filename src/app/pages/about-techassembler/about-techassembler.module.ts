import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutTechassemblerPageRoutingModule } from './about-techassembler-routing.module';

import { AboutTechassemblerPage } from './about-techassembler.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutTechassemblerPageRoutingModule
  ],
  declarations: [AboutTechassemblerPage]
})
export class AboutTechassemblerPageModule {}
