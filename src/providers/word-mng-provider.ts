import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../environments/environment';

import { AuthProvider } from './auth-provider';

import { ResponseDate } from './../models/ResponseData';
import { Sub7CatList } from './../models/sub/Sub7CatList';
import { InsertDefaultCount } from './../models/sub/InsertDefaultCount';
import { DeleteDefaultCount } from './../models/sub/DeleteDefaultCount';
import { UpdateWordCount } from './../models/sub/UpdateWordCount';
import { WordUpdateInfo } from './../models/sub/WordUpdateInfo';

@Injectable()
export class WordMngProvider {

    private reqUrl: String;

    constructor(
        public http: HttpClient,
        private _auth: AuthProvider
    ) {
        this.reqUrl = environment.requestUrl;
    }

    getDefaultWordList(): Promise<Array<Sub7CatList>> {
        return this._auth.getIdToken().then(idToken => {
            return new Promise<Array<Sub7CatList>>((resolve, reject) => {

                const reqData = {
                }

                this.http.post(`${this.reqUrl}/ad/word-mng/default-word/list`, reqData, {
                    headers: new HttpHeaders().set('Authorization', idToken)
                }).subscribe(data => {

                    const resData = data as ResponseDate;

                    if (resData.res) {
                        resolve(resData.data as Array<Sub7CatList>);
                    } else {
                        const msg: string = resData.code + ": " + resData.msg;
                        reject(msg);
                    }

                }, err => {
                    reject(err);
                });
            });
        });
    }

    createDefaultCatLec(catId: number): Promise<InsertDefaultCount> {
        return this._auth.getIdToken().then(idToken => {
            return new Promise<InsertDefaultCount>((resolve, reject) => {

                const reqData = {
                    catId: catId
                }
                
                this.http.post(`${this.reqUrl}/ad/word-mng/default-word/insert/cat-lec`, reqData, {
                    headers: new HttpHeaders().set('Authorization', idToken)
                }).subscribe(data => {

                    const resData = data as ResponseDate;

                    if (resData.res) {
                        resolve(resData.data as InsertDefaultCount);
                    } else {
                        const msg: string = resData.code + ": " + resData.msg;
                        reject(msg);
                    }

                }, err => {
                    reject(err);
                });
            });
        });
    }

    createAllDefaultCatLec(): Promise<InsertDefaultCount> {
        return this._auth.getIdToken().then(idToken => {
            return new Promise<InsertDefaultCount>((resolve, reject) => {

                const reqData = {
                }
                
                this.http.post(`${this.reqUrl}/ad/word-mng/etc/insert-all/cat-lec`, reqData, {
                    headers: new HttpHeaders().set('Authorization', idToken)
                }).subscribe(data => {

                    const resData = data as ResponseDate;

                    if (resData.res) {
                        resolve(resData.data as InsertDefaultCount);
                    } else {
                        const msg: string = resData.code + ": " + resData.msg;
                        reject(msg);
                    }

                }, err => {
                    reject(err);
                });
            });
        });
    }

    insertDefaultWord(file: File): Promise<UpdateWordCount> {
        return this._auth.getIdToken().then(idToken => {
            return new Promise<UpdateWordCount>((resolve, reject) => {

                const reqData: FormData = new FormData();
                reqData.append('file', file);
                
                this.http.post(`${this.reqUrl}/ad/word-mng/default-word/insert/word`, reqData, {
                    headers: new HttpHeaders().set('Authorization', idToken)
                }).subscribe(data => {

                    const resData = data as ResponseDate;

                    if (resData.res) {
                        resolve(resData.data as UpdateWordCount);
                    } else {
                        const msg: string = resData.code + ": " + resData.msg;
                        reject(msg);
                    }

                }, err => {
                    reject(err);
                });
            });
        });
    }

    upload7Check(file: File): Promise<WordUpdateInfo> {
        return this._auth.getIdToken().then(idToken => {
            return new Promise<WordUpdateInfo>((resolve, reject) => {

                const reqData: FormData = new FormData();
                reqData.append('file', file);
                
                this.http.post(`${this.reqUrl}/ad/word-mng/default-word/upload-check`, reqData, {
                    headers: new HttpHeaders().set('Authorization', idToken)
                }).subscribe(data => {

                    const resData = data as ResponseDate;

                    if (resData.res) {
                        resolve(resData.data as WordUpdateInfo);
                    } else {
                        const msg: string = resData.code + ": " + resData.msg;
                        reject(msg);
                    }

                }, err => {
                    reject(err);
                });
            });
        });
    }

    update() {

    }

    deleteDefault(catId: number): Promise<DeleteDefaultCount> {
        return this._auth.getIdToken().then(idToken => {
            return new Promise<DeleteDefaultCount>((resolve, reject) => {

                const reqData = {
                    catId: catId
                }
                
                this.http.post(`${this.reqUrl}/ad/word-mng/default-word/delete`, reqData, {
                    headers: new HttpHeaders().set('Authorization', idToken)
                }).subscribe(data => {

                    const resData = data as ResponseDate;

                    if (resData.res) {
                        resolve(resData.data as DeleteDefaultCount);
                    } else {
                        const msg: string = resData.code + ": " + resData.msg;
                        reject(msg);
                    }

                }, err => {
                    reject(err);
                });
            });
        });
    }

    deleteAllDefault(): Promise<DeleteDefaultCount> {
        return this._auth.getIdToken().then(idToken => {
            return new Promise<DeleteDefaultCount>((resolve, reject) => {

                const reqData = {
                }
                
                this.http.post(`${this.reqUrl}/ad/word-mng/etc/delete-all`, reqData, {
                    headers: new HttpHeaders().set('Authorization', idToken)
                }).subscribe(data => {

                    const resData = data as ResponseDate;

                    if (resData.res) {
                        resolve(resData.data as DeleteDefaultCount);
                    } else {
                        const msg: string = resData.code + ": " + resData.msg;
                        reject(msg);
                    }

                }, err => {
                    reject(err);
                });
            });
        });
    }

    reorderId(): Promise<any> {
        return this._auth.getIdToken().then(idToken => {
            return new Promise<any>((resolve, reject) => {

                const reqData = {
                }
                
                this.http.post(`${this.reqUrl}/ad/word-mng/etc/reorder-id`, reqData, {
                    headers: new HttpHeaders().set('Authorization', idToken)
                }).subscribe(data => {

                    const resData = data as ResponseDate;

                    if (resData.res) {
                        resolve();
                    } else {
                        const msg: string = resData.code + ": " + resData.msg;
                        reject(msg);
                    }

                }, err => {
                    reject(err);
                });
            });
        });
    }
}