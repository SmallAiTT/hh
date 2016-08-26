/**
 * Created by smallaitt on 20/8/16.
 */

module hh.CFG {
    var _handlerArr = [];

    /**
     * 注册CFG值处理函数。
     * @param handler
     */
    export function registerValueHandler(handler){
        _handlerArr.push(handler);
    }

    /**
     * 设置CFG值。
     * @param data
     * @param key
     * @param isBool
     */
    export function setValue(data, key, isBool?){
        var defaultValue = CFG[key];
        var dv = data[key];
        if(dv == null) CFG[key] = defaultValue;
        else{
            dv = isBool ? !!dv : dv;
            CFG[key] = dv;
        }
    }

    /**
     * 解析CFG内容
     * @param data
     */
    export function parse(data){
        for (var i = 0, l_i = _handlerArr.length; i < l_i; i++) {
            var handler = _handlerArr[i];
            handler(data);
        }
    }

    //解析http参数
    export function parseParam(){
        var data = {};
        var src = window.location.href;
        var index = src.indexOf('?');
        if(index > 0){
            var str = src.substring(index + 1);
            var arr = str.split('&');
            for (var i = 0, l_i = arr.length; i < l_i; i++) {
                var paramStr = arr[i];
                var param = paramStr.split('=');
                var pKey = param[0], pValue:any = param[1];
                if(pValue.match(/(^\d+$)/)){
                    pValue = parseInt(pValue);
                }else if(pValue.match(/(^\d+.\d+$)/)){
                    pValue = parseFloat(pValue);
                }
                data[pKey] = pValue;
            }
        }
        CFG.parse(data);
    }

    //加载CFG配置
    export function load(cb){
        //加载配置文件
        NET.loadJson('cfg.json', function(err, data){
            if(err){
                LOG.error('缺失cfg.json文件，请检查！');
            }else{
                CFG.parse(data);
            }
            if((<any>hh).isNative){//不是h5就没有myProject.json和浏览器参数模式
                return cb();
            }
            NET.loadJson('my-cfg.json', function(err, data){
                if(err){
                    CFG.parseParam();
                    cb();
                }else{
                    CFG.parse(data);
                    CFG.parseParam();
                    cb();
                }
            });
        });
    }


    /** 版本号 */
    export var version:string = '0.0.1';
    /** 程序包名，实际上会再加上projName作为真正的包名 */
    export var pkg:string = 'net.holyhigh';
    /** 项目名称 */
    export var projName:string = 'hh';
    /** app名称 */
    export var appName:string = 'HolyHigh精品游戏';
    /** 日志等级 */
    export var logLvl:any = {};
    /** 渲染模式，1为webgl，否则为canvas */
    export var renderMode:number = 1;
    export var canvas:string;
    /** 是否显示FPS */
    export var showFPS:boolean = false;
    /** 帧率 */
    export var frameRate:number = 60;

    /** 设计分辨率 */
    export var design:any = {width:960, height:640};//size
    /** 适配，目前没用 */
    export var resolution:any = {width:960, height:640};//size

    /** 自由选项 */
    export var option:any = {};

    export var scaleMode:string;

    registerValueHandler(function(data){
        setValue(data, 'version');
        setValue(data, 'pkg');
        setValue(data, 'projName');
        setValue(data, 'appName');
        setValue(data, 'logLvl');
        setValue(data, 'renderMode');
        setValue(data, 'showFPS', true);
        setValue(data, 'frameRate');
        setValue(data, 'design');
        setValue(data, 'resolution');
        setValue(data, 'option');
        setValue(data, 'scaleMode');
        setValue(data, 'canvas');
    });
}