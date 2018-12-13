import { UserProvider } from './../../../providers/user-provider';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CommonProvider } from './../../../providers/common-provider';

import { User } from './../../../models/User';

import { UserPhotoPage } from './../photo/user-photo';
import { UserDetailPage } from './../detail/user-detail';
import { UserRolePage } from './../role/user-role';
import { UserStatPage } from './../stat/user-stat';

@Component({
    selector: 'page-userList',
    templateUrl: 'user-list.html'
})
export class UserListPage {

    users: Array<User>;
    loadedUsers: Array<User>;

    searchClicked: boolean = false;

    constructor(
        public navCtrl: NavController,
        private _cmn: CommonProvider,
        private _user: UserProvider
    ) {
        const loader = this._cmn.getLoader(null, null);
        loader.present();

        this.getUsers()
            .then(() => loader.dismiss())
            .catch(() => loader.dismiss());
    }

    getUsers(): Promise<any> {
        return this._user.getUserList()
            .then(users => {
                this.loadedUsers = users;
                this.initializeUsers();
            });
    }

    initializeUsers(): void {
        this.users = this.loadedUsers;
    }

    search(ev: any): void {
        // Reset items back to all of the items
        this.initializeUsers();

        // set val to the value of the searchbar
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.users = this.users.filter((item) => {
                return (item.email.toLowerCase().indexOf(val.toLowerCase()) > -1
                    || item.displayName.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }

    clearSearch(ev: any): void {
        ev.target.value = null;
    }

    cancelSearch(): void {
        this.searchClicked = false;
        this.initializeUsers();
    }

    showUserPhoto(photoURL: string): void {
        this.navCtrl.push(UserPhotoPage, { photoURL: photoURL });
    }

    showUserInfo(uid: string): void {
        this.navCtrl.push(UserDetailPage, {uid: uid});
    }

    showUserRole(uid: string): void {
        this.navCtrl.push(UserRolePage, {uid: uid});
    }

    showUserStat(uid: string): void {
        this.navCtrl.push(UserStatPage, {uid: uid});
    }

    deleteUser(uid: string): void {
        this._cmn.Alert.confirm(`사용자(${uid})를 삭제하시겠습니까?`, "사용자 삭제")
            .then(() => {
                const loader = this._cmn.getLoader(null, null);
                loader.present();

                this._user.deleteUser(uid)
                    .then(() => {
                        this._cmn.Toast.present("top", `사용자(${uid})를 삭제하였습니다.`, "toast-success");
                        this.getUsers()
                            .then(() => loader.dismiss())
                            .catch(() => loader.dismiss());
                    })
                    .catch(() => {
                        loader.dismiss();
                    });
            });
    }

}
