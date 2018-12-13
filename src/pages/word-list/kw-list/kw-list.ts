import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { WordUtil } from './../../../utils/word-util';
import { CommonProvider } from './../../../providers/common-provider';
import { FileProvider } from './../../../providers/file-provider';
import { WordProvider } from './../../../providers/word-provider';

import { Sub } from './../../../models/Sub';
import { Cat } from './../../../models/Cat';
import { Lec } from './../../../models/Lec';
import { Word } from './../../../models/Word';

@Component({
    selector: 'page-kwList',
    templateUrl: 'kw-list.html'
})
export class KwListPage {

    isEdit: boolean = false;
    isOrder: boolean = false;

    sub: Sub;
    cat: Cat;
    lec: Lec;
    words: Array<Word>;
    newWord: Word = new Word();

    wordsMap: Map<number, Word>;
    words_: Array<Word>;
    words_trash: Array<number>;

    constructor(
        public navCtrl: NavController,
        private param: NavParams,
        private _cmn: CommonProvider,
        private _file: FileProvider,
        private _word: WordProvider
    ) {
        this.initData();
    }

    initData(): void {
        const loader = this._cmn.getLoader(null, null);
        loader.present();

        this.sub = this.param.get('sub');
        this.cat = this.param.get('cat');
        this.lec = this.param.get('lec');

        this.getWords()
            .then(any => loader.dismiss())
            .catch(err => {
                loader.dismiss();
                console.log(err);
                alert(err);
            });
    }

    getWords(): Promise<any> {
        return this._word.getWordsByLecId(this.lec.id)
            .then(words_ => {
                this.words = words_;
                this.setWordsMap(words_);
            });
    }

    setWordsMap(words: Array<Word>): void {
        let map = new Map<number, Word>();

        words.forEach(lec => {
            map.set(lec.id, lec);
        });

        this.wordsMap = map;
    }

    addWord(): void {
        if (this.newWord.col01.isEmpty()) {
            return;
        }

        const loader = this._cmn.getLoader(null, null);
        loader.present();

        this.newWord.lecId = this.lec.id;
        this.newWord.num = this.words.length + 1

        this._word.insertWords([this.newWord])
            .then(() => {

                this._cmn.Toast.present("top", this.newWord.col01 + " - 등록되었습니다.", "toast-success");
                this.getWords()
                    .then(() => loader.dismiss())
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
    }

    //////////////////////////////////////////////////////////////////////////////

    startEdit(): void {
        this.isEdit = true;
        this.words_trash = [];
        this.words_ = this.words.map(x => Object.assign({}, x));
    }

    startOrder(): void {
        this.isOrder = true;
        this.words_trash = [];
        this.words_ = this.words.map(x => Object.assign({}, x));
    }

    save(): void {
        this._cmn.Alert.confirm("저장하시겠습니까?").then(yes => {

            if (!this.checkSave()) {
                this._cmn.Alert.alert("Word - 필수 입력 사항입니다.");
                return;
            }

            const loader = this._cmn.getLoader(null, null);
            loader.present();

            this.words_trash = this.reTrashWord(this.words_trash);
            this.words_ = this.reNumberingWords(this.words_);

            this._word.deleteWords(this.words_trash)
                .then(() => {
                    this._word.updateWords(this.words_)
                        .then(() => {
                            this.getWords();
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
        }).catch(no => null);
    }

    checkSave(): boolean {
        let successFlag = true;

        for (let word_ of this.words_) {
            if (word_.col01.isEmpty()) {
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
                this.words_trash = [];
            }
        }).catch(no => null);
    }

    download() {
        const fileName = this.cat.name + "_" + this.lec.name + ".xlsx";
        let datas = WordUtil.word2ExcelData(this.sub.id, this.words);

        this._file.export(fileName, datas);
    }

    async onFileChange(evt: any) {

        const dt: DataTransfer = <DataTransfer>(evt.target);

        if (dt.files.length == 1) {
            const datas = await this._file.uploadExcel(dt.files[0]);
            this.words_.pushArray(
                WordUtil.excelData2Word(
                    this.sub.id, datas, this.lec.id));
        } else {
            // this.words_ = [];
            // this.fileName = null;
        }
    }

    //////////////////////////////////////////////////////////////////////////////

    trashWord(index: number, word: Word): void {
        this.words_.splice(index, 1);
        this.words_trash.push(word.id);
    }

    reorderWords(indexes): void {
        let element = this.words_[indexes.from];
        this.words_.splice(indexes.from, 1);
        this.words_.splice(indexes.to, 0, element);
    }

    reNumberingWords(words: Array<Word>): Array<Word> {

        for (let i = 0; i < words.length; i++) {
            words[i].num = i + 1;
        }

        return words;
    }

    reTrashWord(words_trash: Array<number>): Array<number> {
        let trashIds = new Array<number>();

        this.words_trash.forEach(id => {
            if(id != null) {
                trashIds.push(id);
            }
        })

        return trashIds;
    }
}
