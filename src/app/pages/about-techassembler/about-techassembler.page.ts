import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-about-techassembler',
  templateUrl: './about-techassembler.page.html',
  styleUrls: ['./about-techassembler.page.scss'],
})
export class AboutTechassemblerPage implements OnInit {

  constructor(private menuController: MenuController) { }
  ngOnInit() {
  }
  onMenuClick() {
    this.menuController.enable(true, 'id')
    this.menuController.open('id')
  }

}
