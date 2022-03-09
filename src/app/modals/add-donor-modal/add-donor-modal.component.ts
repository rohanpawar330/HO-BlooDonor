import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonDatetime, ModalController, PopoverController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { UserDetailsI } from '../../interface/interface';
import { USER_DETAIL } from '../../common-utilities/constant';

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
  yearValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];


  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router, private modalCtrl: ModalController) {}



  ngOnInit() {
     this.createDonorForm();
  }

  createDonorForm() {
    this.donorForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName:["",[Validators.required,Validators.pattern("^[a-zA-Z]*$")]],
      gender: new FormControl('', Validators.required),
      mobileNo: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.phoneRegex)])),
      age: new FormControl('', Validators.compose([Validators.required])),
      dateOfDonation: new FormControl(''),
      bloodGroup: new FormControl('', Validators.required),
      availableForDonation: new FormControl('', Validators.required),
      address: this.formBuilder.group({
        city: new FormControl('', Validators.required),
        area: new FormControl('',Validators.required),
        state: new FormControl('', Validators.required),
        pincode: new FormControl('', Validators.required),
      })

    });
  }
  submit(){
    console.log(this.donorForm.value);
    
  }

  addDonar() {
    // this.dataService.addUser({
    //   firstName: this.userDetail.firstName,
    //   lastName: this.userDetail.lastName,
    //   mobileNo: this.userDetail.mobileNo,
    //   gender: this.userDetail.gender,
    //   age: this.userDetail.age,
    //   dateOfDonation: this.userDetail.dateOfDonation,
    //   bloodGroup: this.userDetail.bloodGroup,
    //   availableForDonation: this.userDetail.availableForDonation,
    //   address: {
    //     city: this.userDetail.address.city,
    //     area: this.userDetail.address.area,
    //     state: this.userDetail.address.state,
    //     pincode: this.userDetail.address.pincode,
    //   }
    // }).then(() => {
    //   this.router.navigate['home'];
    // });

    console.log(this.userDetail)
  }

  cancel() { this.router.navigate['home']; }

  _dismiss() {
    this.modalCtrl.dismiss({
      'fromModal': 'Subscribed TechAssembler'
    });
  }

  ionDateChange(event) {
    let date;
    if (date != event.detail.value) {
      date = event.detail.value;
      this.closeDatePicker();
    }
    console.log(new Date(event.detail.value));
  }

  closeDatePicker() {
    this.datePopOver.dismiss();
  }

  _bloodGroupSelected(bloodGroup) {
    this.userDetail.bloodGroup = bloodGroup;
  }

}
