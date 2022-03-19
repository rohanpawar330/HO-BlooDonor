import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonDatetime, ModalController, PopoverController } from '@ionic/angular';
import { DonorService } from '../../services/donor.service';
import { UserDetailsI } from '../../interface/interface';
import { USER_DETAIL } from '../../common-utilities/constant';
import moment from 'moment';
import { UtilityService } from 'src/app/common-utilities/utility.service';

@Component({
  selector: 'app-add-donor',
  templateUrl: './add-donor-modal.component.html',
  styleUrls: ['./add-donor-modal.component.scss'],
})
export class AddDonorModal implements OnInit {

  @ViewChild('datePicker', { static: false }) datePicker: IonDatetime;
  @ViewChild('datePopOver', { static: false }) datePopOver: PopoverController;

  userDetail: UserDetailsI = USER_DETAIL;
  donorForm: FormGroup;
  isSubmitted: boolean;
  titleAlert: string = 'This field is required';
  post: any = '';
  phoneRegex: RegExp = /^((\\+91-?)|0)?[0-9]{10}$/;
  todayDate: any = new Date();
  date = this.todayDate.toISOString();

  constructor(private formBuilder: FormBuilder, private utility: UtilityService, private donorService: DonorService, private router: Router, private modalCtrl: ModalController) { }



  ngOnInit() {
    this.createDonorForm();
  }

  createDonorForm() {
    this.donorForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      // gender: new FormControl(''),
      mobileNo: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.phoneRegex)])),
      age: new FormControl('', Validators.compose([Validators.required, Validators.min(18), Validators.max(40)])),
      dateOfDonation: new FormControl(''),
      // , Validators.required
      // donationType: new FormControl(''),
      // bloodGroup: new FormControl('', Validators.required),
      availableForDonation: new FormControl(''),
      address: this.formBuilder.group({
        city: new FormControl('', Validators.required),
        area: new FormControl(''),
        state: new FormControl(''),
        // pincode: new FormControl('', Validators.required),
      })

    });
  }
  // submit() {
  //   console.log(this.donorForm.value);

  // }

  submit() {
    console.log(this.userDetail)
    if (this.userDetail.gender && this.userDetail.bloodGroup) {

      this.utility._showLoader();
      this.donorService.addDonor({
        firstName: this.userDetail.firstName,
        lastName: this.userDetail.lastName,
        mobileNo: this.userDetail.mobileNo,
        gender: this.userDetail.gender,
        age: this.userDetail.age,
        donationType: this.userDetail.donationType,
        dateOfDonation: this.userDetail.dateOfDonation,
        bloodGroup: this.userDetail.bloodGroup,
        availableForDonation: this.userDetail.availableForDonation,
        address: {
          city: this.userDetail.address.city,
          area: this.userDetail.address.area,
          state: this.userDetail.address.state,
        }
      }).then(() => {
        this.utility._hideLoader();
        this._dismiss();
      }).catch(() => {
        this.utility._hideLoader();
        this.utility._errorAlert();
      });;
    } else {
      this.utility._confirmationAlert('Empty Fields!', 'Please fill all the required fields')
    }

    // console.log(form)
  }

  cancel() { this._dismiss(); }

  _dismiss() {
    this.modalCtrl.dismiss();
  }

  ionDateChange(event) {
    let date;
    if (date != event.detail.value) {
      date = event.detail.value;
      this.closeDatePicker();
    }

    // this.donorForm.patchValue({ dateofDonation: moment(event.detail.value).format('DD/MM/YYYY') })
  }

  closeDatePicker() {
    this.datePopOver.dismiss();
  }

  _bloodGroupSelected(bloodGroup) {
    this.userDetail.bloodGroup = bloodGroup;
  }
  _genderSelected(gender) {
    this.userDetail.gender = gender;
  }
  _donationType(donationType) {
    this.userDetail.donationType = donationType
  }
}
