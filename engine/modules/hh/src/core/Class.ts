/**
 * Created by smallaitt on 20/8/16.
 */
module hh {

    var _hashCodeCounter:number = 1;
    export function genHashCode():number{
        return _hashCodeCounter++;
    }

    /**
     * 储藏室
     */
    export class Store {
        /** 哈希值 */
        hashCode:number = genHashCode();
        pool:any = {};
        tempPool:any = {};
        pool4Single:any = {};
        tempArgsMap:any = {};
        valuePool:any = {};

        /**
         * 往仓库中进行保存
         * @param owner 保存归属标示
         * @param type 保存类型
         * @param listener 保存的监听
         * @param ctx 监听方法的上下文
         * @param priority 优先级，值越小优先级越高
         */
        add(owner:string, type:string, listener:Function, ctx:any, priority:number) {
            var pool = this.pool;
            var map:any = pool[owner] = pool[owner] || {};
            var arr:any[] = map[type] = map[type] || [];

            for (var i = 0, l_i = arr.length; i < l_i; i++) {
                var obj = arr[i];
                if (!obj) continue;
                if (obj.listener == listener && obj.ctx == ctx) return;//避免重复注册
            }
            var info = {listener: listener, ctx: ctx, priority: priority};
            if (priority == null) {
                arr.push(info);
            } else {// 如果有优先级则进行优先级处理
                var index = 0;
                for (var i = 0, l_i = arr.length; i < l_i; i++) {
                    var obj = arr[i];
                    if (obj.priority == null || obj.priority <= priority) {//往后追加
                        index = i + 1;
                    } else if (obj.priority > priority) {
                        index = i;
                        break;
                    }
                }
                arr.splice(index, 0, info);
            }
        }

        /**
         * 删除仓库中保存的内容。
         * @param owner 保存归属标示
         * @param type 保存类型
         * @param listener 保存的监听
         * @param ctx 监听方法的上下文
         */
        del(owner:string, type:string, listener:Function, ctx:any) {
            var pool = this.pool;
            var map = pool[owner];
            if (!map) return;
            var arr = map[type];
            if (!arr) return;
            for (var i = 0, l_i = arr.length; i < l_i; i++) {
                var obj = arr[i];
                if (obj.listener == listener && obj.ctx == ctx) {
                    arr.splice(i, 1);
                    return;
                }
            }
        }

        /**
         * 按照拥有者和类型进行清空操作
         * @param owner 保存归属标示
         * @param type 保存类型
         */
        clear(owner:string, type:string) {
            var pool = this.pool;
            var map = pool[owner];
            if (!map) return;
            var arr = map[type];
            if (!arr) return;
            arr.length = 0;
        }

        /**
         * 往仓库中进行保存，单一模式。
         * @param owner 保存归属标示
         * @param type 保存类型
         * @param listener 保存的监听
         * @param ctx 监听方法的上下文
         */
        addSingle(owner:string, type:string, listener:Function, ctx:any) {
            var self = this, pool4Single = self.pool4Single, map = pool4Single[owner];
            if (!map) {
                map = pool4Single[owner] = {};
            }
            map[type] = {listener: listener, ctx: ctx};
        }

        /**
         * 删除仓库中保存的内容，单一模式。
         * @param owner 保存归属标示
         * @param type 保存类型
         */
        delSingle(owner:string, type:string) {
            var self = this, pool4Single = self.pool4Single, map = pool4Single[owner];
            if (!map) return;
            delete map[type];
        }


        /**
         * 删除仓库中所有保存的内容。
         * @param owner 保存归属标示
         * @param type 保存类型
         */
        delAll(owner:string, type?:string) {
            var pool = this.pool, pool4Single = this.pool4Single;
            var map = pool[owner], map4Single = pool4Single[owner];
            if (arguments.length == 1) {//删除所有
                if (map) {
                    for (var key in map) {
                        delete map[key];
                    }
                }
                if (map4Single) {
                    for (var key in map4Single) {
                        delete map4Single[key];
                    }
                }
            } else {//删除指定的type。
                if (map) {
                    var arr = map[type];
                    if (arr) arr.length = 0;
                }
                if (map4Single) {
                    delete map4Single[type];
                }
            }
        }

        /**
         * 获取模板数组。
         * @param owner 保存归属标示
         * @param type 保存类型
         */
        getTempArr(owner:string, type:string) {
            var pool = this.pool, tempPool = this.tempPool;
            var map = pool[owner];
            if (!map) return null;
            var arr = map[type];
            if (!arr) return null;

            var tempMap:any = tempPool[owner] = tempPool[owner] || {};
            var tempArr:any[] = tempMap[type] = tempMap[type] || [];
            tempArr.length = 0;
            for (var i = 0, l_i = arr.length; i < l_i; i++) {
                tempArr.push(arr[i]);
            }
            return tempArr;
        }

        /**
         * 获取单一模式信息
         * @param owner 保存归属标示
         * @param type 保存类型
         */
        getSingle(owner:string, type:string):any {
            var self = this, pool4Single = self.pool4Single, map = pool4Single[owner];
            if (!map) return null;
            return map[type];
        }

        /**
         * 获取模板参数。
         * @param owner 保存归属标示
         * @param type 保存类型
         * @param args 参数
         */
        getTempArgs(owner:string, type:string, args):any[] {
            var tempArgsMap = this.tempArgsMap;
            var map:any = tempArgsMap[owner] = tempArgsMap[owner] || {};
            var arr:any[] = map[type] = map[type] || [];
            if (arr.length > 0) {//如果长度大于0，证明还在使用该temp数组。这时候就重新new一个进行返回
                arr = [];
            }
            for (var i = 0, l_i = args.length; i < l_i; i++) {
                arr.push(args[i]);
            }
            return arr;
        }

        /**
         * 设置值信息。
         * @param owner 保存归属标示
         * @param type 保存类型
         * @param args 参数
         */
        setValue(owner:string, type:string, args:any) {
            var valuePool = this.valuePool;
            var map = valuePool[owner];
            if (!map) {
                map = valuePool[owner] = {};
            }
            map[type] = args;
        }

        /**
         * 删除值
         * @param owner 保存归属标示
         * @param type 保存类型
         */
        delValue(owner:string, type:string):any {
            var valuePool = this.valuePool;
            var map = valuePool[owner];
            if (!map) return null;
            return map[type];
        }
    }

    export class Class{
        /** 类 */
        static __c:any;
        /** 类名 */
        static __n:string;

        static __recycler:any[] = [];
        static push(obj:any){
            this.__recycler.push(obj);
        }
        static pop(...args):any{
            var clazz = this;
            var obj = clazz.__recycler.pop();
            if(obj) return obj;
            else return clazz.create.apply(clazz, args);
        }

        /** 创建 */
        static create(...args:any[]):any {
            var Class:any = this;
            var obj:any = new Class();
            if (obj.init) obj.init.apply(obj, arguments);
            return obj;
        }

        /** 获取单例 */
        static getInstance(...args:any[]) {
            var Class:any = this;
            if (!Class._instance) {
                var instance:any = Class._instance = Class.create.apply(Class, arguments);
                instance._isInstance = true;
            }
            return Class._instance;
        }

        /** 释放单例 */
        static release() {
            var Class:any = this;
            var instance:any = Class._instance;
            if (instance) {
                if (instance.doDtor) instance.doDtor();
                Class._instance = null;
            }
        }

        /** 类名 */
        __n:string;
        /** 实例对应的类 */
        __c:any;
        /** 哈希值 */
        hashCode:number;
        /** 是否是单例 */
        _isInstance:boolean;
        /** 储藏室 */
        _store:Store;
        /** 是否已经释放了 */
        released:boolean;

        _initProp():void {
        }

        constructor() {
            var self = this;
            self.hashCode = genHashCode();
            self._store = new Store();
            self._initProp();
        }

        public init(...args:any[]) {
        }

        public dtor() {
            var self = this;
            if (self.released) return;
            self.released = true;
            self._dtor();
        }

        _dtor() {
        }
    }
}