import { DefaultWordPage } from './../default-word/default-word';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CommonProvider } from './../../../providers/common-provider';
import { WordMngProvider } from './../../../providers/word-mng-provider';

@Component({
    selector: 'page-wordEtc',
    templateUrl: 'word-etc.html'
})
export class WordEtcPage {

    constructor(
        public navCtrl: NavController,
        private _cmn: CommonProvider,
        private _wordMng: WordMngProvider
    ) {

    }

    createAllDefaultCatLec(): void {
        this._cmn.Alert.confirm("기본 Category와 Lecture를 모두 생성하시겠습니까", "Warning").then(yes => {

            const loader = this._cmn.getLoader(null, null, 120000);
            loader.present();

            this._wordMng.createAllDefaultCatLec()
                .then(count => {
                    alert("생성 Category: " + count.catInsertCount + "개 \n" 
                        + "생성 Lecture: " + count.lecInsertCount + "개");
                    this._cmn.Toast.present("top", "생성되었습니다.", "toast-success");
                    loader.dismiss();

                    this.navCtrl.setRoot(DefaultWordPage);
                })
                .catch(err => {
                    loader.dismiss();
                    console.log(err);
                    alert(err);
                });
        }).catch(() => null);
    }

    deleteAllDefault(): void {
        this._cmn.Alert.confirm("기본 Category, Lecture, Word를 모두 삭제하시겠습니까", "Warning").then(yes => {

            const loader = this._cmn.getLoader(null, null, 120000);
            loader.present();

            this._wordMng.deleteAllDefault()
                .then(count => {
                    alert("삭제 Category: " + count.catDeleteCount + "개 \n" 
                        + "삭제 Lecture: " + count.lecDeleteCount + "개");
                    this._cmn.Toast.present("top", "삭제되었습니다.", "toast-success");
                    loader.dismiss();

                    this.navCtrl.setRoot(DefaultWordPage);
                })
                .catch(err => {
                    loader.dismiss();
                    console.log(err);
                    alert(err);
                });
        }).catch(() => null);
    }

    reorderId(): void {
        this._cmn.Alert.confirm("Category, Lecture, Word Id를 재정렬하시겠습니까", "Warning").then(yes => {

            const loader = this._cmn.getLoader(null, null, 120000);
            loader.present();

            this._wordMng.reorderId()
                .then(count => {
                    this._cmn.Toast.present("top", "정렬되었습니다.", "toast-success");
                    loader.dismiss();
                })
                .catch(err => {
                    loader.dismiss();
                    console.log(err);
                    alert(err);
                });
        }).catch(() => null);
    }

}
