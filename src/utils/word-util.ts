import { Word } from './../models/Word';

export class WordUtil {

    public static getNullWord(): Word {
        let word = new Word(); 
        word.num = null;
        word.col01 = null;
        word.col02 = null;
        word.col03 = null;
        word.col04 = null;
        word.col05 = null;
        word.col06 = null;
        word.col07 = null;
        word.col08 = null;
        word.col09 = null;
        word.col10 = null;
        word.col11 = null;
        word.col12 = null;
        word.col13 = null;
        word.col14 = null;
        word.col15 = null;
        word.col16 = null;

        return word;
    }

    /////////////////////////////////////////////////////////////////////

    public static excelData2Word(
            subId: string, 
            datas: Array<Array<any>>,
            lecId: number): Array<Word> {
        let result: Array<Word>;
        
        switch(subId) {
            case "sp":
                result = this.excelData2WordOfSp(datas, lecId);
                break;
            case "sl":
            case "lw":
                result = this.excelData2WordOfSlLw(datas, lecId);
                break;
            case "kw":
                result = this.excelData2WordOfKw(datas, lecId);
                break;
            case "cc":
                result = this.excelData2WordOfCc(datas, lecId);
                break;
            case "c4":
                result = this.excelData2WordOfC4(datas, lecId);
                break;
            case "ew":
                result = this.excelData2WordOfEw(datas, lecId);
                break;
        }
    
        return result;
    }

    private static excelData2WordOfSp(
            datas: Array<Array<any>>,
            lecId: number): Array<Word> {
        let words = new Array<Word>();
        let word: Word;
        let headerFlag = true;
        
        datas.forEach(data => {
            if(!headerFlag) {
                word = this.getNullWord();
                word.lecId = lecId;
                word.col01 = data[0] == undefined? null: data[0];
                word.col02 = data[1] == undefined? null: data[1];
                word.col03 = data[2] == undefined? null: data[2];
                word.col04 = data[3] == undefined? null: data[3];
                if(word.col01 != null) {
                    words.push(word);
                }
            } else {
                headerFlag = false;
            }
        });

        return words;
    }

    private static excelData2WordOfSlLw(
            datas: Array<Array<any>>,
            lecId: number): Array<Word> {
        let words = new Array<Word>();
        let word: Word;
        let headerFlag = true;
        
        datas.forEach(data => {
            if(!headerFlag) {
                word = this.getNullWord();
                word.lecId = lecId;
                word.col01 = data[0] == undefined? null: data[0];
                word.col02 = data[1] == undefined? null: data[1];
                word.col03 = data[2] == undefined? null: data[2];
                if(word.col01 != null) {
                    words.push(word);
                }
            } else {
                headerFlag = false;
            }
        });

        return words;
    }

    private static excelData2WordOfKw(
            datas: Array<Array<any>>,
            lecId: number): Array<Word> {
        let words = new Array<Word>();
        let word: Word;
        let headerFlag = true;

        datas.forEach(data => {
            if(!headerFlag) {
                word = this.getNullWord();
                word.lecId = lecId;
                word.col01 = data[0] == undefined? null: data[0];
                word.col02 = data[1] == undefined? null: data[1];
                word.col03 = data[2] == undefined? null: data[2];
                word.col04 = data[3] == undefined? null: data[3];
                word.col05 = data[4] == undefined? null: data[4];
                word.col06 = data[5] == undefined? null: data[5];
                word.col07 = data[6] == undefined? null: data[6];
                word.col08 = data[7] == undefined? null: data[7];
                word.col09 = data[8] == undefined? null: data[8];
                word.col10 = data[9] == undefined? null: data[9];
                word.col11 = data[10] == undefined? null: data[10];
                word.col12 = data[11] == undefined? null: data[11];
                word.col13 = data[12] == undefined? null: data[12];
                word.col14 = data[13] == undefined? null: data[13];
                if(word.col01 != null) {
                    words.push(word);
                }
            } else {
                headerFlag = false;
            }
        });

        return words;
    }

    private static excelData2WordOfCc(
            datas: Array<Array<any>>,
            lecId: number): Array<Word> {
        let words = new Array<Word>();
        let word: Word;
        let headerFlag = true;

        datas.forEach(data => {
            if(!headerFlag) {
                word = this.getNullWord();
                word.lecId = lecId;
                word.col01 = data[0] == undefined? null: data[0];
                word.col02 = data[1] == undefined? null: data[1];
                word.col03 = data[2] == undefined? null: data[2];
                word.col04 = data[3] == undefined? null: data[3];
                word.col05 = data[4] == undefined? null: data[4];
                word.col06 = data[5] == undefined? null: data[5];
                word.col07 = data[6] == undefined? null: data[6];
                word.col08 = data[7] == undefined? null: data[7];
                word.col09 = data[8] == undefined? null: data[8];
                word.col10 = data[9] == undefined? null: data[9];
                word.col11 = data[10] == undefined? null: data[10];
                word.col12 = data[11] == undefined? null: data[11];
                word.col13 = data[12] == undefined? null: data[12];
                word.col14 = data[13] == undefined? null: data[13];
                word.col15 = data[14] == undefined? null: data[14];
                word.col16 = data[15] == undefined? null: data[15];
                if(word.col01 != null) {
                    words.push(word);
                }
            } else {
                headerFlag = false;
            }
        });

        return words;
    }

    private static excelData2WordOfC4(
            datas: Array<Array<any>>,
            lecId: number): Array<Word> {
        let words = new Array<Word>();
        let word: Word;
        let headerFlag = true;

        datas.forEach(data => {
            if(!headerFlag) {
                word = this.getNullWord();
                word.lecId = lecId;
                word.col01 = data[0] == undefined? null: data[0];
                word.col02 = data[1] == undefined? null: data[1];
                word.col03 = data[2] == undefined? null: data[2];
                word.col04 = data[3] == undefined? null: data[3];
                word.col05 = data[4] == undefined? null: data[4];
                word.col06 = data[5] == undefined? null: data[5];
                word.col07 = data[6] == undefined? null: data[6];
                word.col08 = data[7] == undefined? null: data[7];
                word.col09 = data[8] == undefined? null: data[8];
                word.col10 = data[9] == undefined? null: data[9];
                word.col11 = data[10] == undefined? null: data[10];
                if(word.col01 != null) {
                    words.push(word);
                }
            } else {
                headerFlag = false;
            }
        });

        return words;
    }

    private static excelData2WordOfEw(
            datas: Array<Array<any>>,
            lecId: number): Array<Word> {
        let words = new Array<Word>();
        let word: Word;
        let headerFlag = true;

        datas.forEach(data => {
            if(!headerFlag) {
                word = this.getNullWord();
                word.lecId = lecId;
                word.col01 = data[0] == undefined? null: data[0];
                word.col02 = data[1] == undefined? null: data[1];
                word.col03 = data[2] == undefined? null: data[2];
                word.col04 = data[3] == undefined? null: data[3];
                word.col05 = data[4] == undefined? null: data[4];
                word.col06 = data[5] == undefined? null: data[5];
                word.col07 = data[6] == undefined? null: data[6];
                if(word.col01 != null) {
                    words.push(word);
                }
            } else {
                headerFlag = false;
            }
        });

        return words;
    }

    /////////////////////////////////////////////////////////////////////

    public static word2ExcelData(subId: string, words: Array<Word>): Array<Array<any>> {
        let result: Array<Array<any>>;
        
        switch(subId) {
            case "sp":
                result = this.word2ExcelDataOfSp(words);
                break;
            case "sl":
            case "lw":
                result = this.word2ExcelDataOfSlLw(words);
                break;
            case "kw":
                result = this.word2ExcelDataOfKw(words);
                break;
            case "cc":
                result = this.word2ExcelDataOfCc(words);
                break;
            case "c4":
                result = this.word2ExcelDataOfC4(words);
                break;
            case "ew":
                result = this.word2ExcelDataOfEw(words);
                break;
        }
    
        return result;
    }

    private static word2ExcelDataOfSp(words: Array<Word>): Array<Array<any>> {
        let datas = new Array<Array<any>>();
        let data: Array<any>;
        let header = new Array<any>();
        header.push("question");
        header.push("choice1");
        header.push("choice2");
        header.push("answer");
        datas.push(header);

        words.forEach(word => {
            data = new Array<any>();
            
            data.push(word.col01);
            data.push(word.col02);
            data.push(word.col03);
            data.push(word.col04);
            datas.push(data);
        });

        return datas;
    }

    private static word2ExcelDataOfSlLw(words: Array<Word>): Array<Array<any>> {
        let datas = new Array<Array<any>>();
        let data: Array<any>;
        let header = new Array<any>();
        header.push("choice1");
        header.push("choice2");
        header.push("answer");
        datas.push(header);

        words.forEach(word => {
            data = new Array<any>();
            
            data.push(word.col01);
            data.push(word.col02);
            data.push(word.col03);
            datas.push(data);
        });

        return datas;
    }

    private static word2ExcelDataOfKw(words: Array<Word>): Array<Array<any>> {
        let datas = new Array<Array<any>>();
        let data: Array<any>;
        let header = new Array<any>();
        header.push("word");
        header.push("meaning1");
        header.push("meaning2");
        header.push("meaning3");
        header.push("meaning4");
        header.push("meaning5");
        header.push("meaning6");
        header.push("meaning7");
        header.push("example1");
        header.push("example2");
        header.push("example3");
        header.push("example4");
        header.push("example5");
        header.push("example6");
        datas.push(header);

        words.forEach(word => {
            data = new Array<any>();
            
            data.push(word.col01);
            data.push(word.col02);
            data.push(word.col03);
            data.push(word.col04);
            data.push(word.col05);
            data.push(word.col06);
            data.push(word.col07);
            data.push(word.col08);
            data.push(word.col09);
            data.push(word.col10);
            data.push(word.col11);
            data.push(word.col12);
            data.push(word.col13);
            data.push(word.col14);
            datas.push(data);
        });

        return datas;
    }

    private static word2ExcelDataOfCc(words: Array<Word>): Array<Array<any>> {
        let datas = new Array<Array<any>>();
        let data: Array<any>;
        let header = new Array<any>();
        header.push("word");
        header.push("content");
        header.push("content1");
        header.push("content2");
        header.push("content3");
        header.push("content4");
        header.push("meaning1");
        header.push("meaning2");
        header.push("meaning3");
        header.push("meaning4");
        header.push("example1");
        header.push("example2");
        header.push("example3");
        header.push("example4");
        header.push("synonym");
        header.push("antonym");
        datas.push(header);

        words.forEach(word => {
            data = new Array<any>();
            
            data.push(word.col01);
            data.push(word.col02);
            data.push(word.col03);
            data.push(word.col04);
            data.push(word.col05);
            data.push(word.col06);
            data.push(word.col07);
            data.push(word.col08);
            data.push(word.col09);
            data.push(word.col10);
            data.push(word.col11);
            data.push(word.col12);
            data.push(word.col13);
            data.push(word.col14);
            data.push(word.col15);
            data.push(word.col16);
            datas.push(data);
        });

        return datas;
    }

    private static word2ExcelDataOfC4(words: Array<Word>): Array<Array<any>> {
        let datas = new Array<Array<any>>();
        let data: Array<any>;
        let header = new Array<any>();
        header.push("chengyu");
        header.push("content");
        header.push("content1");
        header.push("content2");
        header.push("content3");
        header.push("content4");
        header.push("content5");
        header.push("content6");
        header.push("description");
        header.push("description_synonym");
        header.push("description_antonym");
        datas.push(header);

        words.forEach(word => {
            data = new Array<any>();
            
            data.push(word.col01);
            data.push(word.col02);
            data.push(word.col03);
            data.push(word.col04);
            data.push(word.col05);
            data.push(word.col06);
            data.push(word.col07);
            data.push(word.col08);
            data.push(word.col09);
            data.push(word.col10);
            data.push(word.col11);
            datas.push(data);
        });

        return datas;
    }

    private static word2ExcelDataOfEw(words: Array<Word>): Array<Array<any>> {
        let datas = new Array<Array<any>>();
        let data: Array<any>;
        let header = new Array<any>();
        header.push("word");
        header.push("meaning_type1");
        header.push("meaning_value1");
        header.push("meaning_type2");
        header.push("meaning_value2");
        header.push("example_phrase");
        header.push("example_meaning");
        datas.push(header);

        words.forEach(word => {
            data = new Array<any>();
            
            data.push(word.col01);
            data.push(word.col02);
            data.push(word.col03);
            data.push(word.col04);
            data.push(word.col05);
            data.push(word.col06);
            data.push(word.col07);
            datas.push(data);
        });

        return datas;
    }
}