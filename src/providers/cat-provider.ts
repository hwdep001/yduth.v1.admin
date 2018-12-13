import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../environments/environment';

import { AuthProvider } from './auth-provider';

import { ResponseDate } from './../models/ResponseData';
import { Cat } from './../models/Cat';

@Injectable()
export class CatProvider {

    private reqUrl: String;

    constructor(
        public http: HttpClient,
        private _auth: AuthProvider
    ) {
        this.reqUrl = environment.requestUrl;
    }

    insertCats(cats: Array<Cat>): Promise<any> {
        return this._auth.getIdToken().then(idToken => {
            return new Promise<any>((resolve, reject) => {

                const reqData = cats;

                this.http.post(`${this.reqUrl}/ad/cat/list/insert`, reqData, {
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

    updateCats(cats: Array<Cat>): Promise<any> {
        return this._auth.getIdToken().then(idToken => {
            return new Promise<any>((resolve, reject) => {

                const reqData = cats;

                this.http.post(`${this.reqUrl}/ad/cat/list/update`, reqData, {
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

    deleteCats(catIds: Array<number>): Promise<any> {
        return this._auth.getIdToken().then(idToken => {
            return new Promise<any>((resolve, reject) => {

                const reqData = catIds;

                this.http.post(`${this.reqUrl}/ad/cat/list/delete`, reqData, {
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

    getCatsBySubId(subId: string): Promise<Array<Cat>> {
        return this._auth.getIdToken().then(idToken => {
            return new Promise<Array<Cat>>((resolve, reject) => {

                const reqData = {
                    subId: subId
                }

                this.http.post(`${this.reqUrl}/ad/cat/list`, reqData, {
                    headers: new HttpHeaders().set('Authorization', idToken)
                }).subscribe(data => {

                    const resData = data as ResponseDate;

                    if (resData.res) {
                        resolve(resData.data as Array<Cat>);
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

    isExistCatNameInSub(cat: Cat): Promise<boolean> {
        return this._auth.getIdToken().then(idToken => {
            return new Promise<boolean>((resolve, reject) => {

                const reqData: Cat = {
                    name: cat.name,
                    subId: cat.subId
                }

                this.http.post(`${this.reqUrl}/ad/cat/exist-name`, reqData, {
                    headers: new HttpHeaders().set('Authorization', idToken)
                }).subscribe(data => {

                    const resData = data as ResponseDate;

                    if (resData.res) {
                        resolve(resData.data as boolean);
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