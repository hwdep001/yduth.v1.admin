import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { CommonProvider } from './../../../providers/common-provider';
import { UserProvider } from './../../../providers/user-provider';

import { WordCount } from './../../../models/sub/WordCount';

@Component({
    selector: 'page-userStat',
    templateUrl: 'user-stat.html'
})
export class UserStatPage {

    wordCounts: Array<WordCount>;

    constructor(
        private param: NavParams,
        private _cmn: CommonProvider,
        private _user: UserProvider
    ) {
        this.initData();
    }

    initData(): void {
        const loader = this._cmn.getLoader(null, null);
        loader.present();

        const uid = this.param.get('uid');

        this.getWordCounts(uid)
            .then(() => loader.dismiss())
            .catch(err => {
                console.log(err);
                loader.dismiss();
                alert(err);
            });
    }

    getWordCounts(uid: string): Promise<any> {
        return this._user.getWordCountGroupBySub(uid)
            .then(wordCounts_ => {
                this.wordCounts = wordCounts_;
            });
    }
}
