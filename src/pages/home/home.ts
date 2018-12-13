import { Component } from '@angular/core';

import { AuthProvider } from './../../providers/auth-provider';

import { User } from './../../models/User';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: User;

  constructor(
    private _auth: AuthProvider
  ) {
    this.user = _auth.user;
  }

}
