import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { CommonProvider } from './../../../providers/common-provider';
import { UserProvider } from './../../../providers/user-provider';

import { RoleSub7CatList } from './../../../models/sub/RoleSub7CatList';

@Component({
    selector: 'page-userRole',
    templateUrl: 'user-role.html'
})
export class UserRolePage {

    uid: string;
    allRole: boolean = true;
    rscs: Array<RoleSub7CatList>;

    constructor(
        private param: NavParams,
        private _cmn: CommonProvider,
        private _user: UserProvider
    ) {
        this.initData();
    }

    initData() {
        const loader = this._cmn.getLoader(null, null);
        loader.present();

        this.uid = this.param.get('uid');
        this.getRoles()
            .then(() => loader.dismiss())
            .catch(err => {
                console.log(err);
                loader.dismiss();
                alert(err);
            });
    }

    getRoles(): Promise<any> {
        return this._user.getMenuRolesByUser(this.uid)
            .then(rscs => {
                this.rscs = rscs;
            });
    }

    changeAllRole() {
        this.rscs.forEach(rsc => {
            rsc.isChecked = this.allRole;
            rsc.roleCatList.forEach(rc => rc.isChecked = this.allRole);
        });
    }

    saveRoles() {
        this._cmn.Alert.confirm("저장하시겠습니까?").then(yes => {
            this._user.updateMenuRolesByUser(this.uid, this.rscs)
                .then(() => this.initData())
                .catch(err => {
                    console.log(err);
                    alert(err);
                });
        }).catch(no => null);
    }

}
