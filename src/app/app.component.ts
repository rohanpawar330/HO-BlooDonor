import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from './common-utilities/utility.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private utility: UtilityService, private router: Router) {
    this.checkLogin();
  }

  checkLogin() {
    this.utility._getStorage('user').then(data => {
      if (data.value) {
        this.router.navigateByUrl('/home');
      } else {
        this.router.navigateByUrl('/');
      }
    }).catch(err => {
      this.router.navigateByUrl('/');

    })
  }
}
