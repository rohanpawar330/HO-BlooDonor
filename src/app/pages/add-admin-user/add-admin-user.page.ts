import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { ViewController } from '@ionic/core';
import { UtilityService } from 'src/app/common-utilities/utility.service';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { DonorService } from 'src/app/services/donor.service';

@Component({
  selector: 'app-add-admin-user',
  templateUrl: './add-admin-user.page.html',
  styleUrls: ['./add-admin-user.page.scss'],
})
export class AddAdminUserPage implements OnInit {

  addAdminUser: FormGroup;
  phoneRegex: RegExp = /^((\\+91-?)|0)?[0-9]{10}$/;
  user: "";
  data: any;
  constructor(private formBuilder: FormBuilder, private utility: UtilityService, private authService: AuthUserService,
    private donorService: DonorService, private router: Router, private navCtrl: NavController, private modalController: ModalController) { }

  ngOnInit() {
    this.addAdmin()
  }

  addAdmin() {
    this.addAdminUser = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      mobileNo: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.phoneRegex)])),
    });
  }

  close() {
    this.modalController.dismiss();
  }

  addAdminDetails() {
    console.log(this.addAdminUser.value)
    this.authService.addAdmin(this.addAdminUser.value).then(() => {
      this.utility._toastMsg('NewAdmin Added Successfully....')
      this.modalController.dismiss();
    })
  }
}

