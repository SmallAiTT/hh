/**
 * Created by smallaitt on 30/8/16.
 */
module hh{
    export class Pool extends Emitter{

        static _classMap:any;
        static registerClass(clazz:any){
            this._classMap = this._classMap || {};
            if(clazz.__n) this._classMap[clazz.__n] = clazz;
        }
        static getClass(className:string):any{
            this._classMap = this._classMap || {};
            return this._classMap[className];
        }

        _batchId:number;
        _map:any;
        _limitInfoArr:any;
        // 限制个数
        defaultLimit:number;
        _createFunc:Function;
        _resetFunc:Function;
        _saveFunc:Function;
        _releaseFunc:Function;
        closed:boolean;

        _initProp(){
            super._initProp();
            var self = this;
            self._map = {};
            self._limitInfoArr = [];
            self.defaultLimit = 2;// 默认的个数为2
            self._batchId = 0;
        }

        onCreate(createFunc:Function){
            this._createFunc = createFunc;
        }
        onReset(resetFunc:Function){
            this._resetFunc = resetFunc;
        }
        onRecycle(saveFunc:Function){
            this._saveFunc = saveFunc;
        }
        onRelease(releaseFunc:Function){
            this._releaseFunc = releaseFunc;
        }

        prepare(key:string, opt:any, num:number){
            var self = this, map = self._map;
            var batchId = self._batchId;
            var list = map[key] = map[key] || [];
            for(var i = 0; i < num; ++i){
                var obj:any = self._createFunc.call(null, key, opt);
                hh.setExt(obj, 'batchId', batchId);
                list.push(obj);
            }
        }
        get(key:string, opt?:any):any{
            var self = this, map = self._map, obj:any;
            var batchId = self._batchId;
            var list = map[key] = map[key] || [];
            if(list.length > 0) obj = list.pop();
            if(!obj) {
                obj = self._createFunc.call(null, key, opt);
                hh.setExt(obj, 'batchId', batchId);
            }
            // 注意了，故意用了个$符号来做特殊区分
            if(obj.$resetOrRecycle) obj.$resetOrRecycle();
            if(obj.$reset) obj.$reset(key, opt);
            var resetFunc = self._resetFunc;
            if(resetFunc) resetFunc.call(null, key, opt);
            // 将对象池信息绑定到对象中，这样才能让使得对象逆向找到对象池
            hh.setExt(obj, 'pool', self);
            hh.setExt(obj, 'poolKey', key);
            return obj;
        }

        rm(target:any){
            var self = this;
            var poolKey = hh.getExt(target, 'poolKey');
            if(!poolKey || target.released) return;// 不属于通过池创建的
            hh.setExt(target, 'poolKey', null);
            //mo.utils.setExtData(target, 'pool', null);

            var batchId = hh.getExt(target, 'batchId');

            if (!target.released) {
                // 注意了，故意用了个$符号来做特殊区分
                if(target.$resetOrRecycle) target.$resetOrRecycle();
                if(target.$recycle) target.$recycle();
                var saveFunc = self._saveFunc;
                if(saveFunc) saveFunc(poolKey, target);// 进行重置操作
            }

            if(batchId != self._batchId || self.closed || self.released){
                // 如果pool已经关闭或者释放了，则要将对应的节点进行释放操作
                if (target.released) return;
                if(target.dtor) target.dtor();// 进行释放
                else if(self._releaseFunc) self._releaseFunc.call(null, target);
                return;
            }

            var limit = self.getLimit(poolKey);
            var arr = self._map[poolKey] = self._map[poolKey] || [];
            if(arr.length >= limit) {
                // 已经超过了限制数
                if(target.dtor) target.dtor();// 进行释放
            }else{
                arr.push(target);
            }
        }

        setLimit(exp:any, count:number){
            this._limitInfoArr.push([exp, count]);
        }

        getLimit(key:string){
            var limitInfoArr = this._limitInfoArr;
            for(var i = 0, l_i = limitInfoArr.length; i < l_i; ++i){
                var arr = limitInfoArr[0];
                if(key.match(arr[0])) return arr[1];
            }
            return this.defaultLimit;
        }

        _dtor(){
            super._dtor();
            var self = this;
            var map = self._map;
            for(var key in map){
                var arr = map[key];
                while(arr.length){
                    var obj:any = arr.pop();
                    if(obj && obj.dtor) obj.dtor();
                }
                delete map[key];
            }
            self._limitInfoArr.length = 0;
            self._createFunc = null;
            self._resetFunc = null;
            self._saveFunc = null;
            self._releaseFunc = null;
        }
        clear(){
            var self = this;
            var map = self._map;
            self._batchId++;// 批次号递增
            for(var key in map){
                var arr = map[key];
                while(arr.length){
                    var obj:any = arr.pop();
                    if(obj && obj.dtor) obj.dtor();
                    else if(self._releaseFunc) self._releaseFunc.call(null, obj);
                }
                delete map[key];
            }
        }
    }
}