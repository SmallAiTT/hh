/**
 * Created by smallaitt on 20/8/16.
 */

module hh.NET {
    export var log:Function;
    export var debug:Function;
    export var info:Function;
    export var warn:Function;
    export var error:Function;
    LOG.initLogger(NET, 'net');

    export function getXHR(){
        return window['XMLHttpRequest'] ? new window['XMLHttpRequest']() : new ActiveXObject('MSXML2.XMLHTTP');
    }

    export function loadTxt(url:string, cb:Function){
        var xhr = getXHR(),
            errInfo = 'load ' + url + ' failed!';
        xhr.open('GET', url, true);
        if (/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)) {
            // IE-specific logic here
            xhr.setRequestHeader('Accept-Charset', 'utf-8');
            xhr.onreadystatechange = function () {
                if(xhr.readyState === 4)
                    xhr.status === 200 ? cb(null, xhr.responseText) : cb(errInfo);
            };
        } else {
            if (xhr.overrideMimeType) xhr.overrideMimeType('text\/plain; charset=utf-8');
            xhr.onload = function () {
                if(xhr.readyState === 4)
                    xhr.status === 200 ? cb(null, xhr.responseText) : cb(errInfo);
            };
        }
        xhr.send(null);
    }

    export function loadJson(url:string, cb:Function){
        loadTxt(url, function (err, txt) {
            if (err) {
                cb(err);
            }
            else {
                try {
                    cb(null, JSON.parse(txt));
                }
                catch (e) {
                    err = 'parse json [' + url + '] failed : ' + e;
                    error(err);
                    cb(err);
                }
            }
        });
    }

    var _getArgs4Js = function (args) {
        var a0 = args[0], a1 = args[1], a2 = args[2], results:any[] = ['', null, null];

        if (args.length === 1) {
            results[1] = a0 instanceof Array ? a0 : [a0];
        } else if (args.length === 2) {
            if (typeof a1 === 'function') {
                results[1] = a0 instanceof Array ? a0 : [a0];
                results[2] = a1;
            } else {
                results[0] = a0 || '';
                results[1] = a1 instanceof Array ? a1 : [a1];
            }
        } else if (args.length === 3) {
            results[0] = a0 || '';
            results[1] = a1 instanceof Array ? a1 : [a1];
            results[2] = a2;
        } else throw 'arguments error to load js!';
        if(results[0] != '' && results[0].substring(results[0].length - 1) != '/') results[0] += '/';
        return results;
    };
    var _jsCache = {};
    var _loadScript4H5 = function(jsPath, cb){
        var d = document, s = d.createElement('script');
        s.async = false;
        s.src = jsPath;
        _jsCache[jsPath] = true;
        var _onLoad = function(){
            this.removeEventListener('load', _onLoad, false);
            this.removeEventListener('error', _onError, false);
            cb();
        };
        var _onError = function(){
            this.removeEventListener('load', _onLoad, false);
            this.removeEventListener('error', _onError, false);
            cb('Load ' + jsPath + ' failed!');
        };

        s.addEventListener('load', _onLoad,false);
        s.addEventListener('error', _onError,false);
        d.body.appendChild(s);
    };
    export function loadJs(baseDir?:any, jsList?:any, cb?:any) {
        var args = _getArgs4Js(arguments);
        var preDir = args[0], list = args[1], callback:any = args[2];
        if(!(<any>hh).isNative){
            var asyncPool = new AsyncPool(list, 0, function(item, index, cb1){
                var jsPath = preDir + item;
                if(_jsCache[jsPath]) return cb1();
                _loadScript4H5(jsPath, cb1);
            }, callback);
            asyncPool.flow();
        }else{
            for (var i = 0, l_i = list.length; i < l_i; i++) {
                var jsPath = preDir + list[i];
                if(_jsCache[jsPath]) continue;
                _jsCache[jsPath] = true;
                _thisGlobal.require(jsPath);
            }
            callback();
        }

    }
}
