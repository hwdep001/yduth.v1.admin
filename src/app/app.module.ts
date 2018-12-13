import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GooglePlus } from '@ionic-native/google-plus';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

// environments
import { environment } from './../environments/environment';

// providers
import { CommonProvider } from './../providers/common-provider';
import { FileProvider } from './../providers/file-provider';
import { AuthProvider } from './../providers/auth-provider';
import { UserProvider } from './../providers/user-provider';
import { SubProvider } from './../providers/sub-provider';
import { CatProvider } from './../providers/cat-provider';
import { LecProvider } from './../providers/lec-provider';
import { WordProvider } from './../providers/word-provider';
import { WordMngProvider } from './../providers/word-mng-provider';

// pages
import { BackgroundPage } from './../pages/background/background';
import { SignInPage } from './../pages/sing-in/sign-in';
import { HomePage } from './../pages/home/home';
import { CatListPage } from './../pages/cat-list/cat-list';
import { LecListPage } from './../pages/lec-list/lec-list';
import { SpListPage } from './../pages/word-list/sp-list/sp-list';
import { SllwListPage } from './../pages/word-list/sllw-list/sllw-list';
import { KwListPage } from './../pages/word-list/kw-list/kw-list';
import { CcListPage } from './../pages/word-list/cc-list/cc-list';
import { C4ListPage } from './../pages/word-list/c4-list/c4-list';
import { EwListPage } from './../pages/word-list/ew-list/ew-list';
import { UserListPage } from './../pages/user-mng/list/user-list';
import { UserPhotoPage } from './../pages/user-mng/photo/user-photo';
import { UserDetailPage } from './../pages/user-mng/detail/user-detail';
import { UserRolePage } from './../pages/user-mng/role/user-role';
import { UserStatPage } from './../pages/user-mng/stat/user-stat';
import { WordMngTabPage } from './../pages/word-mng/word-mng-tab';
import { DefaultWordPage } from './../pages/word-mng/default-word/default-word';
import { WordEtcPage } from './../pages/word-mng/etc/word-etc';
import { MyInfoPage } from './../pages/my-info/my-info';

@NgModule({
  declarations: [
    MyApp,
    BackgroundPage,
    SignInPage,
    HomePage,
    CatListPage,
    LecListPage,
    SpListPage,
    SllwListPage,
    KwListPage,
    CcListPage,
    C4ListPage,
    EwListPage,
    UserListPage,
    UserPhotoPage,
    UserDetailPage,
    UserRolePage,
    UserStatPage,
    WordMngTabPage,
    DefaultWordPage,
    WordEtcPage,
    MyInfoPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top'}),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BackgroundPage,
    SignInPage,
    HomePage,
    CatListPage,
    LecListPage,
    SpListPage,
    SllwListPage,
    KwListPage,
    CcListPage,
    C4ListPage,
    EwListPage,
    UserListPage,
    UserPhotoPage,
    UserDetailPage,
    UserRolePage,
    UserStatPage,
    WordMngTabPage,
    DefaultWordPage,
    WordEtcPage,
    MyInfoPage
  ],
  providers: [
    GooglePlus,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CommonProvider,
    FileProvider,
    AuthProvider,
    UserProvider,
    SubProvider,
    CatProvider,
    LecProvider,
    WordProvider,
    WordMngProvider
  ]
})
export class AppModule {}
