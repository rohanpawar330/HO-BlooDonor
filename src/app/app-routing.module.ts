import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './guard/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    // redirectTo: 'img-upload',
    redirectTo: 'phone-auth',
    pathMatch: 'full'
  },
  {
    path: 'phone-auth',
    loadChildren: () => import('./pages/phone-auth/phone-auth.module').then(m => m.PhoneAuthPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'img-upload',
    loadChildren: () => import('./pages/img-upload/img-upload.module').then(m => m.ImgUploadPageModule)
  },
  {
    path: 'upload-donor-data',
    loadChildren: () => import('./pages/upload-donor-data/upload-donor-data.module').then(m => m.UploadDonorDataPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
