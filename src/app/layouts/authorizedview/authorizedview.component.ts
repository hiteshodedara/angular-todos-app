import { Component } from '@angular/core';

@Component({
  selector: 'app-authorizedview',
  templateUrl: './authorizedview.component.html',
  styleUrls: ['./authorizedview.component.sass']
})
export class AuthorizedviewComponent {

  isSidebar: boolean = true;

  for_closeSideBar() {
    this.isSidebar = !this.isSidebar
  }
}
