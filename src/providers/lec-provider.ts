import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../environments/environment';

import { AuthProvider } from './auth-provider';

import { ResponseDate } from './../models/ResponseData';
import { Lec } from './../models/Lec';

@Injectable()
export class LecProvider {

    private reqUrl: String;

    constructor(
        public http: HttpClient,
        private _auth: AuthProvider
    ) {
        this.reqUrl = environment.requestUrl;
    }

    insertLecs(lecs: Array<Lec>): Promise<any> {
        return this._auth.getIdToken().then(idToken => {
            return new Promise<any>((resolve, reject) => {

                const reqData = lecs;

                this.http.post(`${this.reqUrl}/ad/lec/list/insert`, reqData, {
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

    updateLecs(lecs: Array<Lec>): Promise<any> {
        return this._auth.getIdToken().then(idToken => {
            return new Promise<any>((resolve, reject) => {

                const reqData = lecs;

                this.http.post(`${this.reqUrl}/ad/lec/list/update`, reqData, {
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

    deleteLecs(lecIds: Array<number>): Promise<any> {
        return this._auth.getIdToken().then(idToken => {
            return new Promise<any>((resolve, reject) => {

                const reqData = lecIds;

                this.http.post(`${this.reqUrl}/ad/lec/list/delete`, reqData, {
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

    getLecsByCatId(catId: number): Promise<Array<Lec>> {
        return this._auth.getIdToken().then(idToken => {
            return new Promise<Array<Lec>>((resolve, reject) => {

                const reqData = {
                    catId: catId
                }

                this.http.post(`${this.reqUrl}/ad/lec/list`, reqData, {
                    headers: new HttpHeaders().set('Authorization', idToken)
                }).subscribe(data => {

                    const resData = data as ResponseDate;

                    if (resData.res) {
                        resolve(resData.data as Array<Lec>);
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

    isExistLecNameInCat(lec: Lec): Promise<boolean> {
        return this._auth.getIdToken().then(idToken => {
            return new Promise<boolean>((resolve, reject) => {

                const reqData: Lec = {
                    name: lec.name,
                    catId: lec.catId
                }

                this.http.post(`${this.reqUrl}/ad/lec/exist-name`, reqData, {
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