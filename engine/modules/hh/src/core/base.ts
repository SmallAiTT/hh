/**
 * Created by smallaitt on 20/8/16.
 */

var _thisGlobal:any = this;
var $E$ = function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }

    __.prototype = b.prototype;
    d.prototype = new __();
};
var $D$ = function (o, p, g, s) {
    Object.defineProperty(o, p, { configurable: true, enumerable: true, get: g, set: s });
};
var $C$ = function(name, clazz){
    var p = clazz.prototype;
    p.__c = clazz;
    p.__n = clazz.__n = name;
};
var $RG$ = $C$;

module LOG{
    var _map = {};

    /**
     * 初始化模块日志
     * @param m
     * @param mName
     */
    export function initLogger(m:any, mName){
        _map[mName] = m;
        m.log = console.log.bind(console);
        m.debug = console.debug.bind(console);
        m.info = console.info.bind(console);
        m.warn = console.warn.bind(console);
        m.error = console.error.bind(console);
    }

    var _setLvl = function(mName, lvl:number){
        var m = _map[mName];
        if(!m) return;//该日志还没初始化过，没法设置等级
        initLogger(m, mName);
        if(lvl > 1){
            m.log = function(){};
            m.debug = function(){};
        }
        if(lvl > 2) m.info = function(){};
        if(lvl > 3) m.warn = function(){};
        if(lvl > 4) m.error = function(){};
    };
    /**
     * 设置日志等级
     * @param mName
     * @param lvl
     */
    export function setLvl(mName, lvl){
        if(mName == 'default'){
            for (var key in _map) {
                if(key == 'default') continue;
                _setLvl(key, lvl);
            }
        }else{
            _setLvl(mName, lvl);
        }
    }

    /**
     * 根据配置文件信息初始化日志。
     * @param config
     */
    export function initByConfig(config){
        var logLvl = config.logLvl;
        if(typeof logLvl == 'number'){
            LOG.setLvl('default', logLvl);
        }else{
            var logLvlDefault = logLvl['default'];
            if(logLvlDefault != null) LOG.setLvl('default', logLvlDefault);
            for (var mName in logLvl) {
                if(mName == 'all') continue;
                LOG.setLvl(mName, logLvl[mName]);
            }
        }
    }

    export var log:Function;
    export var debug:Function;
    export var info:Function;
    export var warn:Function;
    export var error:Function;
    initLogger(LOG, 'LOG');
}