import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { UtilityService } from 'src/app/common-utilities/utility.service';
import { AuthUserService } from 'src/app/services/auth-user.service';

@Component({
  selector: 'app-phone-auth',
  templateUrl: './phone-auth.page.html',
  styleUrls: ['./phone-auth.page.scss'],
})
export class PhoneAuthPage implements OnInit {
  phoneNumber: string;
  loginForm: FormGroup;
  phoneRegex: RegExp = /^((\\+91-?)|0)?[0-9]{10}$/;


  constructor(private formBuilder: FormBuilder, private authService: AuthUserService, private utility: UtilityService, private router: Router) {
  }

  ngOnInit() {
    this.loginInitForm();
  }

  loginInitForm() {
    this.loginForm = this.formBuilder.group({
      phNo: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.phoneRegex)])),
    })
  }
  authenticateUser() {
    this.utility._showLoader();
    var phNo = this.loginForm.value.phNo;
    console.log(phNo)
    this.authService._authUser(phNo).pipe(take(3)).subscribe(data => {
      console.log(data);
      this.utility._hideLoader();
      if (data.length > 0) {
        if (data[0].mobileNo == phNo) {
          this.utility._setStorage({ key: 'admin', value: { mobileNo: data[0].mobileNo, adminName: 'Rohan Pawar' } });
          this.router.navigate(['home'])
        }
      } else {
        this.utility._errorAlert("You're not the Admin", 'Invalid credentials!');
      }

    }, err => {
      this.utility._hideLoader();
      this.utility._errorAlert("You're not the Admin", 'Invalid credentials!');
    })

  }
}
