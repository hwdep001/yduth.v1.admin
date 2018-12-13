declare global {

    interface String {
        isEmpty(): boolean;
    }

    interface Array<T> {
        pushArray(array: Array<T>): void;
    }
}

String.prototype.isEmpty = function() {

    if(this == null || this == undefined) {
        return true;
    }

    if(this.trim() == "") {
        return true;
    }

    return false;
};

Array.prototype.pushArray = function(array) {
    this.push.apply(this, array);
};

export class CommonUtil {

    public static void(): void {};
}