
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { AlertController, IonDatetime, IonRouterOutlet, MenuController, ModalController, PopoverController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { UpdateDeleteModal } from '../../modals/update-delete-modal/update-delete-modal.component';
import { format, parseISO } from 'date-fns';
import { Router } from '@angular/router';
import { UserDetailsI } from '../../interface/interface';
import { AddDonorModal } from '../../modals/add-donor-modal/add-donor-modal.component';
import { UtilityService } from 'src/app/common-utilities/utility.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  allDonors: UserDetailsI[] = [];
  availableDonors: UserDetailsI[] = [];
  @ViewChild('datePicker', { static: false }) datePicker: IonDatetime;
  @ViewChild('datePopOver', { static: false }) datePopOver: PopoverController;
  todayDate: any = new Date();
  date = this.todayDate.toISOString();
  fromModalData: string;
  public userInfo = [];
  selectedSegment: string = 'available';

  constructor(private utility: UtilityService, private router: Router, private dataService: DataService, private cd: ChangeDetectorRef, private alertCtrl: AlertController, private modalCtrl: ModalController, private datepipe: DatePipe, private routerOutLet: IonRouterOutlet, private menuController: MenuController) {
    this.dataService._getDataWhere('availableForDonation', '==', true).subscribe(data => {
      this.availableDonors = data;
      this.cd.detectChanges();
    })
    this.dataService.getUsersList().subscribe(res => {
      console.log(res)
      this.allDonors = res;
      this.cd.detectChanges();
    });

  }

  ngOnInit() {
    console.log(this.todayDate);
    //  JSON Dummy data
    this.userInfo = [
      {
        "availableForDonation": "No",
        "gender": "Male",
        "age": 26,
        "lastName": "singh",
        "dateOfDonation": null,
        "bloodGroup": "O+",
        "address": {
          "city": "banaras",
          "pincode": 482005,
          "area": "Ranjhi",
          "state": "MP"
        },
        "mobileNo": 1919191919,
        "firstName": "Aman",
        "id": "C6B4JRYZtXMe6OFUx76j"
      },

      {
        "address": {
          "city": "Jbp",
          "area": "Ranjhi",
          "pincode": 482005,
          "state": "MP"
        },
        "dateOfDonation": null,
        "age": 27,
        "mobileNo": 8787878787,
        "availableForDonation": "Yes",
        "firstName": "Kanni",
        "lastName": "kohli",
        "gender": "Female",
        "bloodGroup": "A+",
        "id": "E2p7WPUQwxOjvKin5lsg"
      },
      {
        "mobileNo": 1212121212,
        "dateOFDonation": "12/12/12",
        "lastName": "Shahreen",
        "age": 24,
        "address": {
          "pincode": 410101,
          "city": "Indore",
          "state": "MP",
          "area": "ABC"
        },
        "dateOfDonation": null,
        "gender": "Female",
        "bloodGroup": "O+",
        "firstName": "Shahreen12",
        "availableForDonation": "Yes",
        "id": "q1fRZBPdVIjxH3gWTYCj"
      }
    ]


  }

  async addDonar() {
    const modal = await this.modalCtrl.create({
      component: AddDonorModal,
    });
    return await modal.present();
  }

  async openDonar(userDetail: UserDetailsI) {
    const modal = await this.modalCtrl.create({
      component: UpdateDeleteModal,
      componentProps: { id: userDetail.id },
      breakpoints: [0, 0.5, 0.8, 1],
      initialBreakpoint: 0.8
    });

    await modal.present();
  }

  onClick() {
    console.log(this.dataService.getAvailableDonor());
  }
  // checkbox Data
  public form = [
    { val: 'A+', isChecked: true },
    { val: 'A-', isChecked: false },
    { val: 'B+', isChecked: false },
    { val: 'B-', isChecked: true },
    { val: 'O+', isChecked: false },
    { val: 'O-', isChecked: false },
    { val: 'AB+', isChecked: false },
    { val: 'AB-', isChecked: false },
    { val: 'AB+', isChecked: false },
    { val: 'AB-', isChecked: false },
  ];

  // menuBar open
  onMenuClick() {
    this.menuController.enable(true, 'id')
    this.menuController.open('id')
  }

  segmentChanged(event) {
    console.log(event.detail.value);
    this.selectedSegment = event.detail.value;

  }
}