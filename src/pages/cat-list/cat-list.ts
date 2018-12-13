import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CommonProvider } from './../../providers/common-provider';
import { SubProvider } from './../../providers/sub-provider';
import { CatProvider } from './../../providers/cat-provider';

import { Sub } from './../../models/Sub';
import { Cat } from './../../models/Cat';

import { LecListPage } from './../lec-list/lec-list';

@Component({
    selector: 'page-catList',
    templateUrl: 'cat-list.html'
})
export class CatListPage {

    isEdit: boolean = false;
    isOrder: boolean = false;

    sub: Sub;
    cats: Array<Cat>;

    catsMap: Map<number, Cat>;
    cats_: Array<Cat>;
    cats_trash: Array<number>;

    constructor(
        public navCtrl: NavController,
        private param: NavParams,
        private _cmn: CommonProvider,
        private _sub: SubProvider,
        private _cat: CatProvider
    ) {
        this.initData();
    }

    initData(): void {
        const loader = this._cmn.getLoader(null, null);
        loader.present();

        const subId = this.param.get('id');

        this.sub = this._sub.getSub(subId);
        this.getCats()
            .then(() => loader.dismiss())
            .catch(err => {
                console.log(err);
                loader.dismiss();
            });
    }

    getCats(): Promise<any> {
        return this._cat.getCatsBySubId(this.sub.id)
        .then(cats_ => {
            this.cats = cats_;
            this.setCatsMap(cats_);
        });
    }

    setCatsMap(cats: Array<Cat>): void {
        let map = new Map<number, Cat>();

        cats.forEach(cat => {
            map.set(cat.id, cat);
        });

        this.catsMap = map;
    }

    addCat(newCatName: string): void {

        if(newCatName.isEmpty()) {
            return;
        }

        const loader = this._cmn.getLoader(null, null);
        loader.present();

        const newCat: Cat = {
            name: newCatName,
            subId: this.sub.id,
            num: this.cats.length+1
        }

        this._cat.isExistCatNameInSub(newCat)
            .then(isExist => {

                if(isExist) {

                    this._cmn.Toast.present("top", "이름이 중복되었습니다.", "toast-fail");
                    loader.dismiss();

                } else {

                    this._cat.insertCats([newCat])
                        .then(() => {

                            this._cmn.Toast.present("top", newCatName + " - 등록되었습니다.", "toast-success");
                            this.getCats();
                            loader.dismiss();
                        })
                        .catch(err => {
                            console.log(err);
                            loader.dismiss();
                        });
                }
            })
            .catch(err => {
                console.log(err);
                loader.dismiss();
            });
    }

    clickCat(cat: Cat): void {
        this.navCtrl.push(LecListPage, {
          activeName: this._sub.getActiveName(this.sub.id), sub: this.sub, cat: cat});
    }

    //////////////////////////////////////////////////////////////////////////////

    startEdit(): void {
        this.isEdit = true;
        this.cats_trash = [];
        this.cats_ = this.cats.map(x => Object.assign({}, x));
    }

    startOrder(): void {
        this.isOrder = true;
        this.cats_trash = [];
        this.cats_ = this.cats.map(x => Object.assign({}, x));
    }

    save(): void {
        this._cmn.Alert.confirm("저장하시겠습니까?").then(yes => {

            if (!this.checkSave()) {
                this._cmn.Alert.alert("이름은 필수 입력 사항입니다.");
                return;
            }

            const loader = this._cmn.getLoader(null, null);
            loader.present();
            
            this.cats_ = this.reNumberingCats(this.cats_);
            this._cat.deleteCats(this.cats_trash)
                .then(() => {
                    this._cat.updateCats(this.cats_)
                        .then(() => {
                            this.getCats();
                            this.isEdit = false;
                            this.isOrder = false;
                            loader.dismiss();
                        }).catch(err => {
                            console.log(err);
                            loader.dismiss();
                        });
                }).catch(err => {
                    console.log(err);
                    loader.dismiss();
                });
        }).catch(() => null);
    }

    checkSave(): boolean {
        let successFlag = true;

        for (let cat_ of this.cats_) {
            if (cat_.name.isEmpty()) {
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
                this.cats_trash = [];
            }
        }).catch(no => null);
    }

    //////////////////////////////////////////////////////////////////////////////

    trashCat(index: number, cat: Cat): void {
      this.cats_.splice(index, 1);
      this.cats_trash.push(cat.id);
    }

    reorderCats(indexes): void {
        let element = this.cats_[indexes.from];
        this.cats_.splice(indexes.from, 1);
        this.cats_.splice(indexes.to, 0, element);
    }

    reNumberingCats(cats: Array<Cat>): Array<Cat> {
        
        for(let i=0; i<cats.length; i++) {
            cats[i].num = i+1;
        }

        return cats;
    }
}
