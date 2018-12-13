import { Component } from '@angular/core';

import { DefaultWordPage } from './default-word/default-word';
import { WordEtcPage } from './etc/word-etc';

@Component({
  selector: 'page-wordMngTab',
  templateUrl: 'word-mng-tab.html',
})
export class WordMngTabPage {

  tab1Root: any = DefaultWordPage;
  tab2Root: any = WordEtcPage;

  constructor() {

  }

}
