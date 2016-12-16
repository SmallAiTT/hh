/**
 * Created by smallaitt on 30/8/16.
 */
module hh{
    var _extKey = '__ext';

    /**
     * 为对象设置拓展值，避免对象直接属性过多导致性能下降。而且，这样的api也比较有利于管理.
     * @param target
     * @param keyOrData
     * @param data
     */
    export function setExt(target:any, keyOrData:any, data?){
        var extData:any = target[_extKey] = target[_extKey] || {};
        if(typeof keyOrData == 'string' || typeof keyOrData == 'number'){
            extData[keyOrData] = data;
        }else{
            for (var k in keyOrData) {
                extData[keyOrData] = keyOrData[k];
            }
        }
    }

    /**
     * 获取对象拓展值。
     * @param target
     * @param key
     * @returns {any}
     */
    export function getExt(target:any, key:string):any{
        var extData:any = target[_extKey];
        return extData ? extData[key] : null;
    }

    /**
     * 清除对象拓展数据
     * @param target
     */
    export function clearExtData(target:any){
        delete target[_extKey];
    }

    export function resetObj(srcObj:any, dstObj:any):any{
        if(srcObj){// 如果存在则先进行清空
            for (var key in srcObj) {
                delete srcObj[key];
            }
        }else{
            srcObj = {};
        }
        for (var key in dstObj) {
            srcObj[key] = dstObj[key];
        }
        return srcObj;
    }

    export function resetArr(srcArr:any[], dstArr:any[]):any[]{
        if(srcArr) srcArr.length = 0;
        else srcArr = [];
        for (var i = 0, l_i = dstArr.length; i < l_i; i++) {
            srcArr.push(dstArr[i]);
        }
        return srcArr;
    }

    export const EMPTY_OBJ:any = {};
    export const EMPTY_ARR:any[] = [];
}