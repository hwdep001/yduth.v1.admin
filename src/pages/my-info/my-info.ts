import { Component } from '@angular/core';

import { AuthProvider } from './../../providers/auth-provider';

import { User } from './../../models/User';

@Component({
  selector: 'page-myInfo',
  templateUrl: 'my-info.html'
})
export class MyInfoPage {

  user: User;

  constructor(
    private _auth: AuthProvider
  ) {
    this.user = _auth.user;
  }

  signOut() {
    this._auth.signOut();
  }

}
