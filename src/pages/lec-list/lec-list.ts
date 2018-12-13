import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CommonProvider } from './../../providers/common-provider';
import { SubProvider } from './../../providers/sub-provider';
import { LecProvider } from './../../providers/lec-provider';

import { Sub } from './../../models/Sub';
import { Cat } from './../../models/Cat';
import { Lec } from './../../models/Lec';

import { SpListPage } from './../word-list/sp-list/sp-list';
import { SllwListPage } from './../word-list/sllw-list/sllw-list';
import { KwListPage } from './../word-list/kw-list/kw-list';
import { CcListPage } from './../word-list/cc-list/cc-list';
import { C4ListPage } from './../word-list/c4-list/c4-list';
import { EwListPage } from './../word-list/ew-list/ew-list';

@Component({
    selector: 'page-lecList',
    templateUrl: 'lec-list.html'
})
export class LecListPage {

    isEdit: boolean = false;
    isOrder: boolean = false;

    sub: Sub;
    cat: Cat;
    lecs: Array<Lec>;

    lecsMap: Map<number, Lec>;
    lecs_: Array<Lec>;
    lecs_trash: Array<number>;

    constructor(
        public navCtrl: NavController,
        private param: NavParams,
        private _cmn: CommonProvider,
        private _sub: SubProvider,
        private _lec: LecProvider
    ) {
        this.initData();
    }

    initData(): void {
        const loader = this._cmn.getLoader(null, null);
        loader.present();

        this.sub = this.param.get('sub');
        this.cat = this.param.get('cat');

        this.getLecs()
            .then(() => loader.dismiss())
            .catch(err => {
                loader.dismiss();
                console.log(err);
                alert(err);
            });
    }

    getLecs(): Promise<any> {
        return this._lec.getLecsByCatId(this.cat.id)
            .then(lecs_ => {
                this.lecs = lecs_;
                this.setLecsMap(lecs_);
            });
    }

    setLecsMap(lecs: Array<Lec>): void {
        let map = new Map<number, Lec>();

        lecs.forEach(lec => {
            map.set(lec.id, lec);
        });

        this.lecsMap = map;
    }

    addLec(newLecName: string): void {

        if (newLecName.isEmpty()) {
            return;
        }

        const loader = this._cmn.getLoader(null, null);
        loader.present();

        const newLec: Lec = {
            name: newLecName,
            catId: this.cat.id,
            num: this.lecs.length + 1
        }

        this._lec.isExistLecNameInCat(newLec)
            .then(isExist => {

                if (isExist) {

                    this._cmn.Toast.present("top", "이름이 중복되었습니다.", "toast-fail");
                    loader.dismiss();

                } else {

                    this._lec.insertLecs([newLec])
                        .then(() => {

                            this._cmn.Toast.present("top", newLecName + " - 등록되었습니다.", "toast-success");
                            this.getLecs()
                            .then(() => loader.dismiss())
                            .catch(err => {
                                loader.dismiss()
                                console.log(err);
                                alert(err);
                            });
                        })
                        .catch(err => {
                            loader.dismiss();
                            console.log(err);
                            alert(err);
                        });
                }
            })
            .catch(err => {
                loader.dismiss();
                console.log(err);
                alert(err);
            });
    }

    clickLec(lec: Lec): void {
        const option = {
            activeName: this._sub.getActiveName(this.sub.id),
            sub: this.sub,
            cat: this.cat,
            lec: lec
        }

        switch(this.sub.id) {
          case "sp":
            this.navCtrl.push(SpListPage, option);
            break;
          case "sl":
          case "lw":
            this.navCtrl.push(SllwListPage, option);
            break;
          case "kw":
            this.navCtrl.push(KwListPage, option);
            break;
          case "cc":
            this.navCtrl.push(CcListPage, option);
            break;
          case "c4":
            this.navCtrl.push(C4ListPage, option);
            break;
          case "ew": 
            this.navCtrl.push(EwListPage, option);
            break;
        }
    }

    //////////////////////////////////////////////////////////////////////////////

    startEdit(): void {
        this.isEdit = true;
        this.lecs_trash = [];
        this.lecs_ = this.lecs.map(x => Object.assign({}, x));
    }

    startOrder(): void {
        this.isOrder = true;
        this.lecs_trash = [];
        this.lecs_ = this.lecs.map(x => Object.assign({}, x));
    }

    save(): void {
        this._cmn.Alert.confirm("저장하시겠습니까?").then(yes => {

            if (!this.checkSave()) {
                this._cmn.Alert.alert("이름은 필수 입력 사항입니다.");
                return;
            }

            const loader = this._cmn.getLoader(null, null);
            loader.present();

            this.lecs_ = this.reNumberingLecs(this.lecs_);
            this._lec.deleteLecs(this.lecs_trash)
                .then(() => {
                    this._lec.updateLecs(this.lecs_)
                        .then(() => {
                            this.getLecs();
                            this.isEdit = false;
                            this.isOrder = false;
                            loader.dismiss();
                        })
                        .catch(err => {
                            loader.dismiss();
                            console.log(err);
                            alert(err);
                        });
                })
                .catch(err => {
                    loader.dismiss();
                    console.log(err);
                    alert(err);
                });
        }).catch(() => null);
    }

    checkSave(): boolean {
        let successFlag = true;

        for (let lec_ of this.lecs_) {
            if (lec_.name.isEmpty()) {
                successFlag = false;
                break;
            }
        }

        return successFlag;
    }

    cancel(): void {
        this._cmn.Alert.confirm("취소하시겠습니까?").then(yes => {
            if (this.isOrder) {
                this.isOrder = false;
            }

            if (this.isEdit) {
                this.isEdit = false;
                this.lecs_trash = [];
            }
        }).catch(no => null);
    }

    //////////////////////////////////////////////////////////////////////////////

    trashLec(index: number, lec: Lec): void {
        this.lecs_.splice(index, 1);
        this.lecs_trash.push(lec.id);
    }

    reorderLecs(indexes): void {
        let element = this.lecs_[indexes.from];
        this.lecs_.splice(indexes.from, 1);
        this.lecs_.splice(indexes.to, 0, element);
    }

    reNumberingLecs(lecs: Array<Lec>): Array<Lec> {

        for (let i = 0; i < lecs.length; i++) {
            lecs[i].num = i + 1;
        }

        return lecs;
    }
}
