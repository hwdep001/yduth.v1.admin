import { CommonProvider } from './../../../providers/common-provider';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

import { UserProvider } from './../../../providers/user-provider';

import { User } from './../../../models/User';
import { Role } from './../../../models/Role';

import { UserPhotoPage } from './../photo/user-photo';

@Component({
    selector: 'page-userDetail',
    templateUrl: 'user-detail.html'
})
export class UserDetailPage {

    user: User = new User();
    roles: Array<Role>;
    roleMap: Map<number, string> = new Map<number, string>();

    constructor(
        public navCtrl: NavController,
        private param: NavParams,
        private alertCtrl: AlertController,
        private _cmn: CommonProvider,
        private _user: UserProvider
    ) {
        const loader = this._cmn.getLoader(null, null);
        loader.present();

        this.user.uid = this.param.get('uid');

        this.getUser()
            .then(() => loader.dismiss())
            .catch(() => loader.dismiss());
    }

    getUser(): Promise<any> {
        return this._user.getUser(this.user.uid)
            .then(dataMap => {
                this.user = dataMap["user"];
                this.roles = dataMap["roleList"];
                this.roleMap = new Map<number, string>();
                this.roles.forEach(role => {
                    this.roleMap.set(role.id, role.name);
                });
            })
            .catch(err => console.log(err));
    }

    showUserPhoto(photoURL: string): void {
        this.navCtrl.push(UserPhotoPage, { photoURL: photoURL });
    }

    changeRole(): void {
        this.presentRadioAlert(null, "권한 변경", this.user.roleId).then(data => {

            if (this.user.roleId == data) {
                return;
            }

            const loader = this._cmn.getLoader(null, null);
            loader.present();

            this._user.updateUserRole(this.user.uid, data)
                .then(() => {
                    this._cmn.Toast.present("top", "수정하였습니다.", "toast-success");
                    this.getUser().then(any => loader.dismiss()).catch(err => loader.dismiss());
                })
                .catch(err => {
                    loader.dismiss();
                    alert(err);
                });
        }).catch(() => null);
    }

    presentRadioAlert(message: string, title: string, defaultRoleId: number): Promise<number> {
        return new Promise<number>((resolve, reject) => {

            let inputs = new Array<any>();
            this.roles.forEach(role => {
                inputs.push({
                    type: 'radio',
                    label: role.name,
                    value: role.id,
                    checked: defaultRoleId == role.id ? true : false
                });
            })

            let radio = this.alertCtrl.create({
                title: title,
                message: message,
                inputs: inputs,
                buttons: [
                    {
                        text: 'Cancel',
                        handler: data => {
                            reject();
                        }
                    },
                    {
                        text: 'Select',
                        handler: data => {
                            resolve(data);
                        }
                    }
                ]
            });
            radio.present();
        });
    }
}
