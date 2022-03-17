import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutTechassemblerPageRoutingModule } from './about-techassembler-routing.module';

import { AboutTechassemblerPage } from './about-techassembler.page';
import player from "lottie-web";
import { LottieModule } from "ngx-lottie";

export function playerFactory() {
  return player
}
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutTechassemblerPageRoutingModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  declarations: [AboutTechassemblerPage]
})
export class AboutTechassemblerPageModule { }
