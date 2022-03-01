import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadDonorDataPage } from './upload-donor-data.page';

const routes: Routes = [
  {
    path: '',
    component: UploadDonorDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadDonorDataPageRoutingModule {}
