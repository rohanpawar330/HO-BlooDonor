
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { AlertController, IonDatetime, IonRouterOutlet, IonSearchbar, MenuController, ModalController, PopoverController } from '@ionic/angular';
import { DonorService } from '../../services/donor.service';
import { UpdateDeleteModal } from '../../modals/update-delete-modal/update-delete-modal.component';
import { format, parseISO } from 'date-fns';
import { Router } from '@angular/router';
import { UserDetailsI } from '../../interface/interface';
import { AddDonorModal } from '../../modals/add-donor-modal/add-donor-modal.component';
import { UtilityService } from 'src/app/common-utilities/utility.service';
import dummyJson from '../../../dummyData/dummyData.json';
import { BLOOD_GROUP } from 'src/app/common-utilities/constant';
import { map, take } from 'rxjs/operators';
import moment from 'moment';
import { AnimationOptions } from 'ngx-lottie';
import { ShareDataService } from 'src/app/common-utilities/shareData.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  // allDonors: UserDetailsI[] = [];
  // availableDonors: UserDetailsI[] = [];
  allDonors
  availableDonors
  donorDataList: any = { allDonors: [], availableDonors: [] };
  @ViewChild('datePicker', { static: false }) datePicker: IonDatetime;
  @ViewChild('datePopOver', { static: false }) datePopOver: PopoverController;
  @ViewChild('search', { static: false }) search: IonSearchbar;
  todayDate: any = new Date();
  date = this.todayDate.toISOString();
  fromModalData: string;
  public userInfo = [];
  selectedSegment: string = 'available';
  bloodGroupList = BLOOD_GROUP
  selectedBG = ''
  options: AnimationOptions = {
    path: 'assets/bloodBottle.json'
  }
  showLoading: boolean = true

  constructor(private shareData: ShareDataService, private utility: UtilityService, private router: Router, private donorService: DonorService, private cd: ChangeDetectorRef, private alertCtrl: AlertController, private modalCtrl: ModalController, private datepipe: DatePipe, private routerOutLet: IonRouterOutlet, private menuController: MenuController) {
    //  code for sapearte service call
    // donorService.getDataWhere('availableForDonation', '==', true).subscribe(data => {
    //   this.availableDonors = data;
    //   this.cd.detectChanges();
    // })



    // // with dummy data start
    // dummyJson.map((data: any) => {
    //   // data.address = {};
    //   data.availableForDonation = this.utility._availableForDonation(data.dateOfDonation, data.gender).availableForDonation
    //   // data.address.city = data.city;
    //   // data.address.area = data.area;
    //   // data.address.pincode = data.pincode;
    //   return data;
    // })

    // console.log(dummyJson)
    // this.allDonors = dummyJson;
    // this.availableDonors = dummyJson.filter(data => data.availableForDonation == true)
    // this.donorDataList.availableDonors = this.availableDonors;
    // this.donorDataList.allDonors = this.allDonors;
    // console.log(this.donorDataList)
    // with dummy data end
    // let dod = ("12/12/2021").split("/").reverse().join("-").concat("T00:00:00.000Z")
    // console.log(dod)
    // var diffInDays = -(moment(dod).diff(moment(moment().toDate(), "DD/MM/YYYY"), 'days') + 1);
    // console.log(diffInDays)
    // console.log("diff", -(moment("2022-01-15T00:32:28Z").diff(moment(moment().toDate(), "DD/MM/YYYY"), 'days') + 1))
    // console.log(moment("15/12/2021 T00:00:00Z").format("DD/mm/yyyy"))
    // console.log(moment.utc(moment("13-03-2022T00:00:00Z")).format())

  }

  ngOnInit() {
    this.getDonorListData();
  }

  getDonorListData() {
    // *** working ****
    // this.utility._showLoader();
    this.allDonors = []
    this.availableDonors = []
    this.donorDataList.availableDonors = [];
    this.donorDataList.allDonors = [];
    console.log(this.allDonors, this.availableDonors, this.donorDataList)
    this.donorService.getDonorsList().pipe(take(2)).subscribe((res: any) => {
      res.map(data =>
        data.availableForDonation = this.utility._availableForDonation(data.dateOfDonation, data.gender, data.donationType).availableForDonation
      )
      this.allDonors = res;
      this.availableDonors = res.filter(data => data.availableForDonation == true)
      this.donorDataList.availableDonors = this.availableDonors;
      this.donorDataList.allDonors = this.allDonors;
      console.log(this.donorDataList)
      console.log(res)
      this.cd.markForCheck();
      setTimeout(() => {
        this.showLoading = false
      }, 2000);
      if (this.donorDataList.availableDonors.length < 0) {
        this.utility._errorAlert();
      }
    }, err => {
      this.showLoading = false
      this.utility._errorAlert();
    });

  }

  async refreshData() {
   await this.getDonorListData()
   await this.utility._toastMsg("Data refreshed!..")
  }

  ionViewWillEnter() {
    this.utility._getStorage('admin').then(data => {
      this.shareData.emitdata(JSON.parse(data.value));
    })


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

    modal.onDidDismiss().then((modelData) => {
      if (modelData !== null) {
        console.log('Modal Data : ' + modelData.data);
      }
    });
    await modal.present();
    // await modal.dismiss().then((data: any) => {
    //   if (data.data && data.data.reload)
    //     // this.refreshData();
    //   console.log("----------------------",data)
    // });
  }

  // menuBar open
  onMenuClick() {
    this.menuController.enable(true, 'id')
    this.menuController.open('id')
  }

  segmentChanged(event) {
    this.selectedSegment = event.detail.value;
  }

  selectedBloodGroup(bloodGroup) {
    this.search.value = '';
    if (this.selectedBG != bloodGroup.bG) {
      this.selectedBG = bloodGroup.bG;
      this.allDonors = this._filterBG(this.selectedBG, 'allDonors');
      this.availableDonors = this._filterBG(this.selectedBG, 'availableDonors')
    }
    else {
      this.selectedBG = '';
      this.allDonors = this.donorDataList.allDonors;
      this.availableDonors = this.donorDataList.availableDonors;
    }
  }

  _filterBG(bloodGroup, donors) {
    if (donors == 'allDonors')
      return this.donorDataList.allDonors.filter(data => data.bloodGroup == bloodGroup);
    else
      return this.donorDataList.availableDonors.filter(data => data.bloodGroup == bloodGroup);
  }

  _ionChange(event) {
    const val = event.target.value;
    this.allDonors = this.donorDataList.allDonors;
    this.availableDonors = this.donorDataList.availableDonors;
    if (val && val.trim() != '') {
      this.allDonors = this.allDonors.filter((user: any) => {
        return (user.firstName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      this.availableDonors = this.availableDonors.filter((user: any) => {
        return (user.firstName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  _reloadPage(event) {
    console.log("----------------inside home", event)
    if (event) {
      this.refreshData()
    }
  }
}