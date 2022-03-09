import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-details-card',
  templateUrl: './user-details-card.component.html',
  styleUrls: ['./user-details-card.component.scss'],
})
export class UserDetailsCardComponent implements OnInit {

  @Input() userInfo:any;
  
  constructor() { }

  ngOnInit() {
    // console.log("data",this.userData[0].firstName);
  
   } 
}
