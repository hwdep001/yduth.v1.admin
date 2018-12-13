import { Cat } from './../Cat';
import { WordComparison } from './WordComparison';

export class WordUpdateInfo {
    cat: Cat;
    newVersion: string;
    wcList: Array<WordComparison>;
}