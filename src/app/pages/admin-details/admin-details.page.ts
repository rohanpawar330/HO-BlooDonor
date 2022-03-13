import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.page.html',
  styleUrls: ['./admin-details.page.scss'],
})
export class AdminDetailsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  OpenaddAdminUserModel() {
    this.router.navigateByUrl('add-admin-user')
  }
  close() {
    this.router.navigateByUrl('/home');
  }
}
