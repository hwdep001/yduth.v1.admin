import { Component, ViewChild } from '@angular/core';

import { CommonProvider } from './../../../providers/common-provider';
import { FileProvider } from './../../../providers/file-provider';
import { WordMngProvider } from './../../../providers/word-mng-provider';

import { Sub7CatList } from './../../../models/sub/Sub7CatList';
import { WordUpdateInfo } from './../../../models/sub/WordUpdateInfo';

@Component({
    selector: 'page-defaultWord',
    templateUrl: 'default-word.html'
})
export class DefaultWordPage {

    @ViewChild('insertFile') insertFile;
    @ViewChild('updateFile') updateFile;
    clickedCatId: number;
    reqFile: File;

    s7cList: Array<Sub7CatList>;
    wuInfo: WordUpdateInfo;

    constructor(
        private _cmn: CommonProvider,
        private _file: FileProvider,
        private _wordMng: WordMngProvider
    ) {
        this.initData();
    }

    initData(): void {
        this.getDefaultWordList();
    }

    getDefaultWordList(): Promise<any> {
        return this._wordMng.getDefaultWordList()
            .then(s7cList => {
                this.s7cList = s7cList;
            });
    }

    createDefaultCatLec(catId: number): void {
        this._cmn.Alert.confirm("기본 Category와 Lecture를 생성하시겠습니까", "Warning").then(yes => {

            const loader = this._cmn.getLoader(null, null, 120000);
            loader.present();

            this._wordMng.createDefaultCatLec(catId)
                .then(count => {
                    alert("생성 Category: " + count.catInsertCount + "개 \n" 
                        + "생성 Lecture: " + count.lecInsertCount + "개");
                    this._cmn.Toast.present("top", "생성되었습니다.", "toast-success");

                    this.initData();
                    loader.dismiss();
                })
                .catch(err => {
                    loader.dismiss();
                    console.log(err);
                    alert(err);
                });
        }).catch(() => null);
    }

    insertDefaultWord(): void {
        this._cmn.Alert.confirm("단어를 등록하시겠습니까", "Warning").then(yes => {

            const loader = this._cmn.getLoader(null, null, 120000);
            loader.present();

            this._wordMng.insertDefaultWord(this.reqFile)
                .then(count => {
                    alert("단어 등록: " + count.insertCount + "개 \n" 
                        + "단어 업데이트: " + count.updateCount + "개 \n"
                        + "단어 삭제: " + count.deleteCount + "개");
                    this._cmn.Toast.present("top", "등록되었습니다.", "toast-success");

                    this.initData();
                    loader.dismiss();
                })
                .catch(err => {
                    loader.dismiss();
                    console.log(err);
                    alert(err);
                });
        }).catch(() => null);
    }

    updateDefaultWord(): void {
        this._cmn.Alert.confirm("단어를 업데이트하시겠습니까", "Warning").then(yes => {

            const loader = this._cmn.getLoader(null, null, 120000);
            loader.present();

            this._wordMng.upload7Check(this.reqFile)
                .then(wuInfo => {
                    alert(wuInfo.wcList.length);

                    loader.dismiss();
                })
                .catch(err => {
                    loader.dismiss();
                    console.log(err);
                    alert(err);
                });
        }).catch(() => null);
    }

    deleteDefault(catId: number): void {
        this._cmn.Alert.confirm("기본 Category, Lecture, Word를 삭제하시겠습니까", "Warning").then(yes => {

            const loader = this._cmn.getLoader(null, null, 120000);
            loader.present();

            this._wordMng.deleteDefault(catId)
                .then(count => {
                    alert("삭제 Category: " + count.catDeleteCount + "개 \n" 
                        + "삭제 Lecture: " + count.lecDeleteCount + "개");
                    this._cmn.Toast.present("top", "삭제되었습니다.", "toast-success");

                    this.initData();
                    loader.dismiss();
                })
                .catch(err => {
                    loader.dismiss();
                    console.log(err);
                    alert(err);
                });
        }).catch(() => null);
    }

    insertFileClick(catId: number): void {
        this.clickedCatId = catId;
        this.insertFile.nativeElement.click();
    }

    updateFileClick(catId: number): void {
        this.clickedCatId = catId;
        this.updateFile.nativeElement.click();
    }

    async onFileChange(evt: any, type: number) {

        const dt: DataTransfer = <DataTransfer>(evt.target);

        if (dt.files.length != 1) {
            return;
        }

        const datas = await this._file.uploadExcel(dt.files[0]);
            
        if(datas[0][1] != this.clickedCatId) {
            alert("Category Id가 잘못되었습니다.");
            return;
        }

        this.reqFile = dt.files[0];

        if(type == 0) {
            this.insertDefaultWord();
        } else {
            this.updateDefaultWord();
        }
    }
    
}
