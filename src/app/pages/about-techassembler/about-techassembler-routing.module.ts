import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutTechassemblerPage } from './about-techassembler.page';

const routes: Routes = [
  {
    path: '',
    component: AboutTechassemblerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutTechassemblerPageRoutingModule {}
