/**
 * Created by smallaitt on 20/8/16.
 */

module hh.STR{
    export var NUM_EXP = /(^([\-]?[\d]+)$)|(^([\-]?[\d]+\.[\d]+)$)/;

    /**
     * 格式化参数成String。
     * 参数和h5的console.log保持一致。
     * @returns {*}
     */
    export function format(...args:any[]):string{
        var l = args.length;
        if(l < 1){
            return '';
        }
        var str = args[0];
        var needToFormat = true;
        if(typeof str == 'object'){
            str = JSON.stringify(str);
            needToFormat = false;
        }
        if(str == null) str = 'null';
        str += '';
        var count = 1;
        if(needToFormat){
            var content = str.replace(/(%d)|(%i)|(%s)|(%f)|(%o)/g, function(world){
                if(args.length <= count) return world;
                var value = args[count++];
                if(world == '%d' || world == '%i'){
                    return parseInt(value);
                }else{
                    return value;
                }
            });
            for (var l_i = args.length; count < l_i; count++) {
                content += '    ' + args[count];
            }
            return content;
        }else{
            for(var i = 1; i < l; ++i){
                var arg = args[i];
                arg = typeof arg == 'object' ? JSON.stringify(arg) : arg;
                str += '    ' + arg;
            }
            return str;
        }
    }

    var _tempStrRegExp = /\$\{[^\s\{\}]*\}/g;

    /**
     * 占位符模式替换。
     * @param tempStr
     * @param map
     * @returns {string}
     */
    export function placeholder(tempStr:string, map:any):string{
        function change(word){
            var key = word.substring(2, word.length - 1)
            var value = map[key];
            if(value == null) {
                console.error("formatTempStr时，map中缺少变量【%s】的设置，请检查！", key);
                return word;
            }
            return value;
        }
        return tempStr.replace(_tempStrRegExp, change);
    }



    /**
     * 字符串补全。
     * @param src
     * @param fillStr
     * @param isPre
     * @returns {*}
     */
    export function fill(src:any, fillStr:string, isPre:boolean = true){
        src = src + "";
        var sl = src.length, fl = fillStr.length;
        if(sl >= fl) return src;
        if(isPre){
            return fillStr.substring(0, fl - sl) + src;
        }else{
            return src + fillStr.substring(sl);
        }
    }

    /**
     * 获取字符串长度，中文为2
     * @param str
     */
    export function getLength(str:string){
        var strArr = str.split("");
        var length = 0;
        for (var i = 0; i < strArr.length; i++) {
            var s = strArr[i];
            if(hasChinese(s)){
                length+=2;
            }else{
                length+=1;
            }
        }
        return length;
    }

    /**
     * 判断一个字符串是否包含中文
     * @param str
     * @returns {boolean}
     */
    export function hasChinese(str:string){
        var reg = /^[u4E00-u9FA5]+$/;
        return !reg.test(str)
    }

    /**
     * 根据字节长度获取文字
     * @param str
     * @param startNum 字数序号
     * @param subLength
     */
    export function sub(str:string, startNum:number, subLength:number){
        var strArr = str.split("");
        var length = 0;
        for (var i = startNum; i < strArr.length; i++) {
            var s = strArr[i];

            if(hasChinese(s)){
                length+=2;
            }else{
                length+=1;
            }
            if(length > subLength) break;
        }
        return str.substring(startNum, i);
    }

    /**
     * 字符串转为对象，注意，对象只能是最低级嵌套，也就是说只有一层   "1:2,2:3" => {"1":2,"2":3}
     * @param str
     * @return {Object}
     */
    export function toObj(str):any{
        str = (str+"").replace(/，/g, ",").replace(/：/g, ":");//为了防止策划误填，先进行转换
        var tempArr0 = str.split(",");
        var obj = {};
        for (var i = 0; i < tempArr0.length; i++) {
            var locTemp = tempArr0[i];
            if(!locTemp) continue;
            var tempArr1 = locTemp.split(":");
            obj[tempArr1[0]] = parseInt(tempArr1[1]);
        }
        return obj;
    }

    /**
     * 将字符串转换为number数组。
     * @param str
     * @param splitStr
     * @returns {Array}
     */
    export function toNums(str:string, splitStr:string = ','):number[]{
        var results = [];
        if(str){
            var arr = str.split(splitStr);
            for (var i = 0, l_i = arr.length; i < l_i; i++) {
                results.push(parseFloat(arr[i]));
            }
        }
        return results;
    }

    export function parseNumOrStr(value:string):any{
        if(!value) return value;
        if(value.search(NUM_EXP) == 0){
            return value.indexOf(".") > 0 ? parseFloat(value) : parseInt(value);
        }
        return value;
    }
}