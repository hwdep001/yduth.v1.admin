import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../environments/environment';

import { AuthProvider } from './auth-provider';

import { ResponseDate } from './../models/ResponseData';
import { User } from './../models/User';
import { RoleSub7CatList } from './../models/sub/RoleSub7CatList';
import { WordCount } from './../models/sub/WordCount';

@Injectable()
export class UserProvider {

    private reqUrl: String;

    constructor(
        public http: HttpClient,
        private _auth: AuthProvider
    ) {
        this.reqUrl = environment.requestUrl;
    }

    getUser(uid: string): Promise<Map<string, any>> {
        return this._auth.getIdToken().then(idToken => {
            return new Promise<Map<string, any>>((resolve, reject) => {

                const data = {
                    uid: uid
                }

                this.http.post(`${this.reqUrl}/ad/user/detail`, data, {
                    headers: new HttpHeaders().set('Authorization', idToken)
                }).subscribe(data => {

                    const resData = data as ResponseDate;

                    if (resData.res) {
                        resolve(resData.data as Map<string, any>);
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

    getUserList(): Promise<Array<User>> {
        return this._auth.getIdToken().then(idToken => {
            return new Promise<Array<User>>((resolve, reject) => {

                this.http.post(`${this.reqUrl}/ad/user/list`, null, {
                    headers: new HttpHeaders().set('Authorization', idToken)
                }).subscribe(data => {

                    const resData = data as ResponseDate;

                    if (resData.res) {
                        resolve(resData.data as Array<User>);
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

    updateUserRole(uid: string, roleId: number): Promise<any> {
        return this._auth.getIdToken().then(idToken => {
            return new Promise<any>((resolve, reject) => {

                const data = {
                    uid: uid,
                    roleId: roleId
                }

                this.http.post(`${this.reqUrl}/ad/user/role/update`, data, {
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

    deleteUser(uid: string): Promise<any> {
        return this._auth.getIdToken().then(idToken => {
            return new Promise<any>((resolve, reject) => {

                const data = {
                    uid: uid
                }

                this.http.post(`${this.reqUrl}/ad/user/delete`, data, {
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

    getMenuRolesByUser(uid: string): Promise<Array<RoleSub7CatList>> {
        return this._auth.getIdToken().then(idToken => {
            return new Promise<Array<RoleSub7CatList>>((resolve, reject) => {

                const data = {
                    uid: uid
                }

                this.http.post(`${this.reqUrl}/ad/user/menu-role/list`, data, {
                    headers: new HttpHeaders().set('Authorization', idToken)
                }).subscribe(data => {

                    const resData = data as ResponseDate;

                    if (resData.res) {
                        resolve(resData.data as Array<RoleSub7CatList>);
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

    updateMenuRolesByUser(uid: string, roleSub7CatList: Array<RoleSub7CatList>): Promise<any> {
        return this._auth.getIdToken().then(idToken => {
            return new Promise<any>((resolve, reject) => {

                const reqData = {
                    uid: uid,
                    roleSub7CatList: roleSub7CatList
                }

                this.http.post(`${this.reqUrl}/ad/user/menu-role/list/update`, reqData, {
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

    getWordCountGroupBySub(uid: String): Promise<Array<WordCount>> {
        return this._auth.getIdToken().then(idToken => {
            return new Promise<Array<WordCount>>((resolve, reject) => {

                const reqData = {
                    uid: uid
                }

                this.http.post(`${this.reqUrl}/ad/user/stat`, reqData, {
                    headers: new HttpHeaders().set('Authorization', idToken)
                }).subscribe(data => {

                    const resData = data as ResponseDate;

                    if (resData.res) {
                        resolve(resData.data as Array<WordCount>);
                    } else {
                        const msg: string = resData.code + ": " + resData.msg;
                        console.log(msg);
                        reject(msg);
                    }

                }, err => {
                    console.log(err);
                    reject(err);
                });
            });
        });
    }

}