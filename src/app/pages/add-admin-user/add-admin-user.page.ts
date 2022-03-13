import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ViewController } from '@ionic/core';
import { UtilityService } from 'src/app/common-utilities/utility.service';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-admin-user',
  templateUrl: './add-admin-user.page.html',
  styleUrls: ['./add-admin-user.page.scss'],
})
export class AddAdminUserPage implements OnInit {

  addAdminUser: FormGroup;
  phoneRegex: RegExp = /^((\\+91-?)|0)?[0-9]{10}$/;
  // mobileNo:string;
  constructor(private formBuilder: FormBuilder,private utility:UtilityService,private authService: AuthUserService,
     private dataService: DataService, private router: Router, private navCtrl: NavController) { }

  ngOnInit() {
    this.addAdmin()
  }
  addAdmin() {
    this.addAdminUser = this.formBuilder.group({
      Name: new FormControl('', Validators.compose([Validators.required])),
      mobileNo: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.phoneRegex)])),
    });
  }
    close() 
    {
      this.router.navigateByUrl('/home');
    }


  }

