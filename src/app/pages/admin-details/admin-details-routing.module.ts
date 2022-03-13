import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDetailsPage } from './admin-details.page';

const routes: Routes = [
  {
    path: '',
    component: AdminDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDetailsPageRoutingModule {}
