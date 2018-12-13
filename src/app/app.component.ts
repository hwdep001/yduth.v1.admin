import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// add
import { App } from 'ionic-angular/components/app/app';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

// firebase
import { AngularFireAuth } from '@angular/fire/auth';

// providers
import { CommonUtil } from './../utils/common-util';
import { CommonProvider } from './../providers/common-provider';
import { AuthProvider } from './../providers/auth-provider';

// models
import { PageInterface } from './../models/menu/PageInterface';
import { MenuTitleInterface } from './../models/menu/MenuTitleInterface';

// pages
import { BackgroundPage } from './../pages/background/background';
import { SignInPage } from './../pages/sing-in/sign-in';
import { HomePage } from '../pages/home/home';
import { CatListPage } from './../pages/cat-list/cat-list';
import { UserListPage } from './../pages/user-mng/list/user-list';
import { WordMngTabPage } from './../pages/word-mng/word-mng-tab';
import { MyInfoPage } from './../pages/my-info/my-info';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = BackgroundPage;
  lastBack: any;  // for backbutton

  pages: Array<{title: string, component: any}>;
  navigatePages: PageInterface[];
  studyPages: PageInterface[];
  settingPages: PageInterface[];
  menuTitle: MenuTitleInterface = {
    header: null,
    navigate: null,
    study: null,
    setting: null
  }

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,

    private app: App,
    private menuCtrl: MenuController,
    private alertCtrl: AlertController,
  
    private afAuth: AngularFireAuth,
    private _cmn: CommonProvider,
    public _auth: AuthProvider,
  ) {
    CommonUtil.void();
    this.initializeApp();
    this.subscribeAuth();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString("#323435");
      this.platform.registerBackButtonAction(() => this.exitApp());
    });
  }

  subscribeAuth() {
    this.afAuth.auth.onAuthStateChanged(fireUser => {

      let pros = new Promise<any>(re => re());

      if(fireUser != null) {
        pros = this._auth.singIn();
      }

      pros.then(() => {
        this.initializeMenu(fireUser);
      });
    });
  }

  initializeMenu(fireUser) {

    if(this._auth.isAuth) {
      this.setPages();
      this.splashScreen.hide();
      this.nav.setRoot(HomePage);
    } else {
      this.splashScreen.hide();
      if(this._auth.existUser && this._auth.roleId < 3) {
        this._cmn.Toast.present("top", "권한이 없습니다.", "toast-fail");
        this._auth.signOut();
      } else {
        this.nav.setRoot(SignInPage);
      }
    }
  }

  setPages() {
    const homePage: PageInterface = { title: 'Home', name: 'HomePage',  component: HomePage, icon: 'home' };
    
    const spPage: PageInterface = { title: '맞춤법',   name: 'SpPage',  component: CatListPage, param: {activeName: "SpPage", id: "sp"}, icon: 'book' };
    const slPage: PageInterface = { title: '표준어',   name: 'SlPage',  component: CatListPage, param: {activeName: "SlPage", id: "sl"}, icon: 'book' };
    const lwPage: PageInterface = { title: '외래어',   name: 'LwPage',  component: CatListPage, param: {activeName: "LwPage", id: "lw"}, icon: 'book' };
    const kwPage: PageInterface = { title: '어휘',     name: 'KwPage',  component: CatListPage, param: {activeName: "KwPage", id: "kw"}, icon: 'book' };
    const ccPage: PageInterface = { title: '한자',     name: 'CcPage',  component: CatListPage, param: {activeName: "CcPage", id: "cc"}, icon: 'book' };
    const c4Page: PageInterface = { title: '한자성어', name: 'C4Page',  component: CatListPage, param: {activeName: "C4Page", id: "c4"}, icon: 'book' };
    const ewPage: PageInterface = { title: '영단어',   name: 'EwPage',  component: CatListPage, param: {activeName: "EwPage", id: "ew"}, icon: 'book' };

    const userListPage: PageInterface = { title: '사용자 관리', name: 'UserListPage', component: UserListPage, icon: 'people'};
    const wordMngTabPage: PageInterface = { title: '단어 관리', name: 'WordMngTabPage', component: WordMngTabPage, icon: 'logo-wordpress'};
    const myInfoPage: PageInterface = { title: 'My Info', name: 'MyInfoPage',  component: MyInfoPage, icon: 'person' };
    
    // const settingTabPage: PageInterface = { title: '설정', name: 'SettingTabPage', component: SettingTabPage, icon: 'settings'};
    // const testPage: PageInterface = { title: 'Tabs', name: 'TestPage', component: TestPage, icon: 'home'};
    
    this.navigatePages = [];
    this.navigatePages.push(homePage);

    this.studyPages = [];
    this.studyPages.push(spPage);
    this.studyPages.push(slPage);
    this.studyPages.push(lwPage);
    this.studyPages.push(kwPage);
    this.studyPages.push(ccPage);
    this.studyPages.push(c4Page);
    this.studyPages.push(ewPage);

    this.settingPages = [];
    this.settingPages.push(userListPage);
    this.settingPages.push(wordMngTabPage);
    this.settingPages.push(myInfoPage);

    this.menuTitle.header = "Menu";
    this.menuTitle.navigate = "Navigate";
    this.menuTitle.study = "Study";
    this.menuTitle.setting = "Setting";
  }

  openPage(page) {
    this.nav.setRoot(page.component, page.param);
  }

  isActive(page: PageInterface) {
    if (this.nav.getActive()) {
      if(this.nav.getActive().name === page.name) {
        return 'primary';
      } else if(this.nav.getActive().getNavParams().get("activeName") == page.name) {
        return 'primary';
      }
    }
    return;
  }

  private exitApp() {
    
    const overlay = this.app._appRoot._overlayPortal.getActive();
    const nav = this.app.getActiveNavs()[0];

    if(this.menuCtrl.isOpen()) {
      this.menuCtrl.close();
    }else if(overlay && overlay.dismiss) {
      overlay.dismiss();
    } else if(nav.getActive().name == "WordCardPage"){
      this.showConfirmAlert("목록으로 돌아가시겠습니까?", ()=> {
        nav.pop();  
      });
    } else if(nav.canGoBack()){
      nav.pop();
    } else if(Date.now() - this.lastBack < 500) {
      this.showConfirmAlert("EXIT?", () => {
        this.platform.exitApp();
      });
    }
    this.lastBack = Date.now();
  }

  showConfirmAlert(message: string, yesHandler) {
    let confirm = this.alertCtrl.create({
      message: message,
      buttons: [
        { text: 'No' },
        {
          text: 'Yes',
          handler: () => {
            yesHandler();
          }
        }
      ]
    });
    confirm.present();
  }
}