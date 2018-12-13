import { Lec } from './../Lec';
import { Word } from './../Word';

export class WordComparison {
    lec: Lec;
    num: number;
    flag: number;   // 0: , 1: insert, 2: update, 3: delete
    preWord: Word;
    newWord: Word;
}